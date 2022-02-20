from datetime import datetime, timedelta
import hashlib
from os import abort
from uuid import uuid4
from flask import Blueprint, g
from flask_expects_json import expects_json
from ..models.session import VALIDITY, Session

from ..validators.authentication import LoginRequestSchema
from ..models.user import User
from ..models.recovery_options import RecoveryOptions, defaultQuestions
from ..models.contact import Contact
from ..validators.user import UserSchema

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/v1/user', methods=['POST'])
@expects_json(UserSchema, check_formats=True)
def register():
    new_recovery_optons = []
    for recoveryOptionsDict in g.data["recovery_options"]:
        recoveryOptionsDict['uid'] = uuid4()
        newRecoveryOption = RecoveryOptions(**recoveryOptionsDict)
        newRecoveryOption.save()
        new_recovery_optons.append(newRecoveryOption.uid)
    new_contact = Contact(**g.data["contact"], uid = uuid4())
    new_contact.save()

    hasher = hashlib.new('sha256')
    hasher.update(g.data["password"].encode('ascii'))
    password_hash = hasher.hexdigest()
    new_user = User(uid = uuid4(), \
                recovery_options = new_recovery_optons, \
                contact = new_contact, \
                password = password_hash, \
                created_at = datetime.now(), \
                updated_at = datetime.now())
    new_user.save()
    return {
        "message": "Success"
    }

@user_bp.route('/v1/user/login', methods=['POST'])
@expects_json(LoginRequestSchema, check_formats=True)
def login():
    hasher = hashlib.new('sha256')
    hasher.update(g.data["password"].encode('ascii'))
    password_hash = hasher.hexdigest()
    contact = Contact.objects.get(email= g.data["email"])
    user = User.objects.get(contact = contact)
    if user.password == password_hash:
        created_timestamp = datetime.now()
        new_session = Session(uid = uuid4(), \
                            token = str(uuid4()), \
                            created_at = created_timestamp, \
                            valid_until = created_timestamp + timedelta(seconds = VALIDITY))
        new_session.save()
        user.sessions.append(new_session)
        user.update(add_to_set__sessions = [new_session])
        return {
            "token": new_session.token
        }
    abort(400, "Incorrect login/password.") 


@user_bp.route('/v1/user/recovery_options', methods=['GET'])
def recovery_options():
    return defaultQuestions
