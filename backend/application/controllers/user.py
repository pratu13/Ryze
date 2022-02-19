from flask import Blueprint
from ..models.user import User

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/v1/user', methods=['GET'])
def user():
    user1 = User(password="Will Riker")
    user1.save()
    return {
        "message": "Success"
    }
