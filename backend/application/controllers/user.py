from datetime import datetime
import hashlib
from uuid import uuid4
from xmlrpc.client import DateTime
from flask import Blueprint, g
from flask_expects_json import expects_json
from ..models.user import User
from ..models.recovery_options import RecoveryOptions
from ..models.contact import Contact
from ..validators.user import UserSchema

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/v1/user', methods=['POST'])
@expects_json(UserSchema, check_formats=True)
def register():
    new_recovery_opton_ids = []
    for recoveryOptionsDict in g.data["recovery_options"]:
        recoveryOptionsDict['uid'] = uuid4()
        newRecoveryOption = RecoveryOptions(**recoveryOptionsDict)
        newRecoveryOption.save()
        new_recovery_opton_ids.append(newRecoveryOption.uid)
    print(new_recovery_opton_ids)
    new_contact = Contact(**g.data["contact"], uid = uuid4())
    new_contact.save()

    hasher = hashlib.new('sha256')
    hasher.update(g.data["password"].encode('ascii'))
    password_hash = hasher.hexdigest()
    new_user = User(uid = uuid4(), \
                   recovery_options_ids = new_recovery_opton_ids, \
                   contacts_id = new_contact.uid, \
                   password = password_hash, \
                   created_at = datetime.now(), \
                   updated_at = datetime.now())
    new_user.save()
    return {
        "message": "Success"
    }
