from datetime import datetime, timedelta
import hashlib
import logging
from uuid import uuid4
from flask import Blueprint, g, redirect, url_for, session
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.session import VALIDITY, Session
from flask_jwt_extended import create_access_token
from ..models.user import User
from ..models.recovery_options import RecoveryOptions, defaultQuestions
from ..models.contact import Contact
from ..validators.user import ContactSchema, LoginRequestSchema, OAuthLoginRequestSchema, PassRecoverThroughEmailSchema, PasswordResetEmailFlowSchema, ProfileUpdateSchema, \
    RegistrationSchema, VerifyRecoveryOptionsSchema, TwoFactorLoginSchema
from mongoengine.errors import NotUniqueError
from flask import request
from flask_mail import Message, Mail
from flask import current_app as app
import pyotp
import os, hashlib, configparser, traceback

from duo_universal.client import Client, DuoException

#from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_dance.contrib.google import make_google_blueprint, google

user_bp = Blueprint('user_bp', __name__)
UNAUTHORIZED_TUPLE = ({"message":"Unauthorized"}, 401)
INVALID_INPUT_TUPLE = ({"message": "Invalid Input"}, 400)

config = configparser.ConfigParser()
config.read("duo.conf")

try:
    '''
    duo_client = Client(
        client_id=config['duo']['client_id'],
        client_secret=config['duo']['client_secret'],
        host=config['duo']['api_hostname'],
        redirect_uri=config['duo']['redirect_uri'],
        duo_certs=config['duo'].get('duo_certs', None),
    )
    '''
    duo_client = Client(
        client_id='DIPG51277QDTXKVTJPIO',
        client_secret= 'oaFfYcPxBru8SpU3x7AuYQODNaw3zo5JYjxqYdkI',
        host= 'api-783d0ac1.duosecurity.com',
        redirect_uri= 'https://localhost:8000/duo-callback'   
    )
except DuoException as e:
    print("*** Duo config error. Verify the values in duo.conf are correct ***")
    raise e

#duo_failmode = config['duo']['failmode']
duo_failmode = 'closed'


@user_bp.route('/v1/user', methods=['POST'])
@expects_json(RegistrationSchema, check_formats=True)
def register():
    try:
        new_recovery_optons = []
        for recoveryOptionsDict in g.data["recovery_options"]:
            recoveryOptionsDict['uid'] = uuid4()
            newRecoveryOption = RecoveryOptions(**recoveryOptionsDict)
            newRecoveryOption.save()
            new_recovery_optons.append(newRecoveryOption)
        new_contact = Contact(**g.data["contact"])
        new_contact.save()

        hasher = hashlib.new('sha256')
        hasher.update(g.data["password"].encode('ascii'))
        password_hash = hasher.hexdigest()
        new_user = User(
                    recovery_options = new_recovery_optons, \
                    contact = new_contact, \
                    password = password_hash, \
                    created_at = datetime.now(), \
                    updated_at = datetime.now())
        new_user.save()
        return {
            "message": "Success"
        }
    except Exception as e:
        logging.exception(e)
        if isinstance(e, NotUniqueError):
            return {"message": "Already Exists"}, 409
        return {"message": "Invalid input"}, 400


@user_bp.route('/v1/user/login', methods=['POST'])
@expects_json(LoginRequestSchema, check_formats=True)
def login():
    try:
        hasher = hashlib.new('sha256')
        hasher.update(g.data["password"].encode('ascii'))
        password_hash = hasher.hexdigest()
        contact = Contact.objects.get(email= g.data["email"])
        user = User.objects.get(contact = contact)
        if user.password != password_hash:
            return {"message" : "Incorrect login/password."}, 400
        

        try:
            duo_client.health_check()
        except DuoException:
            traceback.print_exc()
            #if duo_failmode.upper() == "OPEN":
                # If we're failing open errors in 2FA still allow for success
                #return {"message": "Login successfull but 2FA not performed, confirm Duo values are correct"}, 400
            #else:
                # Otherwise the login fails and redirect user to the login page
                #{"message": "2FA unavailable. Confirm Duo values are correct"}, 400
        
        # Generate random string to act as a state for the exchange
        state = duo_client.generate_state()
        session['state'] = state
        session['username'] = user.contact.email
        prompt_uri = duo_client.create_auth_url(user.contact.email, state)

        return {"redirect_url": prompt_uri}
    except Exception as e:
        logging.exception(e)
        return {"message": "Invalid input"}, 400

       

@user_bp.route('/v1/user/login/duo-callback', methods=['POST'])
def duo_callback(user_id):
    state = request.args.get('state')

    code = request.args.get('duo_code')

    user = User.objects.get(user_id=user_id)

    if 'state' in session and 'username' in session:
        saved_state = session['state']
        username = session['username']
        
        created_timestamp = datetime.now()
  
    else:
       return {"message": "No saved state please login again"}, 400

    if state != saved_state:
        return {"message": "Duo state does not match saved state"}, 400
    
    decoded_token = duo_client.exchange_authorization_code_for_2fa_result(code, username)

    new_session = Session(
                            token=create_access_token(identity=user.uid), \
                            created_at=created_timestamp, \
                            valid_until=created_timestamp + timedelta(seconds = VALIDITY))
    new_session.save()
    user.sessions.append(new_session)
    user.update(add_to_set__sessions = [new_session])
    return {
            "token": new_session.token,
            "name": user.name,
            "color": user.color,
            "duo_decoded_token": decoded_token
        }

'''
@user_bp.route('/v1/user/login', methods=['POST'])
@expects_json(LoginRequestSchema, check_formats=True)
def login():
    try:
        hasher = hashlib.new('sha256')
        hasher.update(g.data["password"].encode('ascii'))
        password_hash = hasher.hexdigest()
        contact = Contact.objects.get(email= g.data["email"])
        user = User.objects.get(contact = contact)
        if user.password != password_hash:
            return {"message" : "Incorrect login/password."}, 400
        created_timestamp = datetime.now()

        try:
            duo_client.health_check()
        except DuoException:
            traceback.print_exc()
            if duo_failmode.upper() == "OPEN":
                # If we're failing open errors in 2FA still allow for success
                return {"message": "Login successfull but 2FA not performed, confirm Duo values are correct"}, 400
            else:
                # Otherwise the login fails and redirect user to the login page
                {"message": "2FA unavailable. Confirm Duo values are correct"}, 400


        # Generate random string to act as a state for the exchange
        state = duo_client.generate_state()
        session['state'] = state
        session['username'] = user.username
        prompt_uri = duo_client.create_auth_url(user.username, state)



        new_session = Session(
                            token=create_access_token(identity=user.uid), \
                            created_at=created_timestamp, \
                            valid_until=created_timestamp + timedelta(seconds = VALIDITY))
        new_session.save()
        user.sessions.append(new_session)
        user.update(add_to_set__sessions = [new_session])
        return {
            "token": new_session.token,
            "name": user.name,
            "color": user.color
        }
    except Exception as e:
        logging.exception(e)
        return {"message": "Invalid input"}, 400
'''


@user_bp.route('/v1/user/login/oauth', methods=['POST'])
@expects_json(OAuthLoginRequestSchema, check_formats=True)
def oauth_login():
    try:
        contact = Contact.objects(email= g.data["contact"]["email"])
        if len(contact) == 0:
            new_contact = Contact(**g.data["contact"])
            new_contact.save()
            new_user = User(
                        contact = new_contact, \
                        created_at = datetime.now(), \
                        updated_at = datetime.now())
            new_user.save()
            user = new_user
        elif len(contact) == 1:
            contact = contact[0]
            user = User.objects.get(contact = contact)
        else:
            return UNAUTHORIZED_TUPLE

        new_session = Session(
                            token=create_access_token(identity=user.uid, \
                                expires_delta = timedelta(seconds = VALIDITY)), \
                            created_at=datetime.now(), \
                            valid_until=datetime.now() + timedelta(seconds = VALIDITY))
        new_session.save()
        user.update(add_to_set__sessions = [new_session])
        
        return {
            "token": new_session.token,
            "name": user.name,
            "color": user.color
        }
    except Exception as e:
        logging.exception(e)
        return {"message": "Invalid input"}, 400

@user_bp.route('/v1/user', methods=['PATCH'])
@jwt_required()
@expects_json(ProfileUpdateSchema, check_formats=True)
def update_profile():
    try:
        user_id = get_jwt_identity()
        user = User.objects.get(uid=user_id)
        user.update(name = g.data["name"], color = g.data["color"])
        return { 
            "message": "Success"
        }
    except Exception as e:
        logging.exception(e)
        return {"message": "Invalid input"}, 400


@user_bp.route('/v1/user/recovery_options', methods=['GET'])
def recovery_options():
    return defaultQuestions


@user_bp.route('/v1/user/recovery_options', methods=['POST'])
@expects_json(ContactSchema, check_formats = True)
def recovery_options_for_recovery():
    try:
        contact = Contact.objects.get(email= g.data["email"])
        user = User.objects.get(contact = contact)
        recovery_options = user.recovery_options
        return {"questions": [  {
                                    "uid": str(option.to_mongo()['uid']), \
                                    "question": option.to_mongo()['question'] \
                                }  \
                                for option in recovery_options 
                            ]
                }
    except Exception as e:
        logging.exception(e)
        return { "message": "Invalid input"}, 400


@user_bp.route('/v1/user/recovery_options', methods=['PATCH'])
@expects_json(VerifyRecoveryOptionsSchema, check_formats = True)
def recovery_options_update_password():
    try: 
        uid = g.data["uid"]
        answer = g.data["answer"]
        recovery_options = RecoveryOptions.objects.get(uid=uid)
        if recovery_options.answer != answer:
            return { "message": "Invalid input"}, 400
        user = User.objects.get(recovery_options = recovery_options)
        hasher = hashlib.new('sha256')
        hasher.update(g.data["password"].encode('ascii'))
        password_hash = hasher.hexdigest()
        user.update(set__password = password_hash)
        return { "message": "Success" }
    except Exception as e:
        logging.exception(e)
        return { "message": "Invalid input"}, 400


def send_mail(user_email,token):
    mail = Mail(app)
    g.mail = mail
    msg = Message('Password Reset Request', recipients=[user_email], sender='whisker7864@gmail.com')
    msg.body = f'''To reset your password, please follow the link below


    {'ryze-lms.herokuapp.com/passwordReset/'+ token }

    '''

    g.mail.send(msg)

@user_bp.route('/v1/user/recovery_options/email_recovery_link', methods=['POST'])
@expects_json(PassRecoverThroughEmailSchema, check_formats = True)
def change_pass_through_email():
    try:
        semail = request.get_json().get('email')
        email_hasher = hashlib.sha224(semail.encode('ascii'))
        token = email_hasher.hexdigest()
        if semail == Contact.objects.get(email= semail).email:
            send_mail(semail,token)
        return {'message': 'Success'}
    except Exception as e:
        logging.exception(e)
        return { "message": str(e)}, 400

@user_bp.route('/v1/user/recovery_options/resetPassword', methods=['POST'])
@expects_json(PasswordResetEmailFlowSchema, check_formats = True)
def reset_password():
    try:
        token = g.data["token"]
        new_password = g.data["password"]
        contacts = Contact.objects()
        user_email_hashes = ["" for i in range(len(contacts))]
        for i in range(len(contacts)):
            email_hasher = hashlib.sha224(contacts[i].email.encode('ascii'))
            user_email_hashes[i]  = email_hasher.hexdigest()

        if token in user_email_hashes:
            user_index = user_email_hashes.index(token)
            user = User.objects.get(contact = contacts[user_index])
            hasher = hashlib.new('sha256')
            hasher.update(new_password.encode('ascii'))
            password_hash = hasher.hexdigest()
            user.update(set__password = password_hash)
            return {"message": "Success"}
        else:
            return UNAUTHORIZED_TUPLE
    except Exception as e:
        logging.exception(e)
        return { "message": str(e)}, 400

'''
@app.route("/glogin")
def glogin():
    if not google.authorized:
        return redirect(url_for("google.login"))
    resp = google.get("/plus/v1/people/me")
    assert resp.ok, resp.text    
    username = resp.json()['emails'][0]['value']

    contact = Contact.objects.get(email= username)
    user = User.objects.get(contact = contact)

    if not contact:
        contact.save()
        user.save()
    
    login_user(user)
    return "Logged in as {0}".format(username)

    
    new_user = User(contact = new_contact, \
                        created_at = datetime.now(), \
                        updated_at = datetime.now())
    new_user.save()
    user = new_user

    new_session = Session(
                            token=create_access_token(identity=user.uid, \
                                expires_delta = timedelta(seconds = VALIDITY)), \
                            created_at=datetime.now(), \
                            valid_until=datetime.now() + timedelta(seconds = VALIDITY))
    new_session.save()
    user.update(add_to_set__sessions = [new_session])
    
    login_user(user)
    return "Logged in as {0}".format(username)
    '''


