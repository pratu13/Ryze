from datetime import datetime, timedelta
import hashlib
import logging
from uuid import uuid4
from flask import Blueprint, g
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.session import VALIDITY, Session
from flask_jwt_extended import create_access_token
from ..models.user import User
from ..models.recovery_options import RecoveryOptions, defaultQuestions
from ..models.contact import Contact
from ..validators.user import ContactSchema, LoginRequestSchema, ProfileUpdateSchema, \
    RegistrationSchema, VerifyRecoveryOptionsSchema
from mongoengine.errors import NotUniqueError

user_bp = Blueprint('user_bp', __name__)


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
        created_timestamp = datetime.now()
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
