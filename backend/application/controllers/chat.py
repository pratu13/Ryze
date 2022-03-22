import logging
from uuid import uuid4
from flask import Blueprint, g
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.application.models.chat import Chat
from backend.application.models.chat_message import ChatMessage, MessageState

from backend.application.models.contact import Contact
from backend.application.models.course import Course
from backend.application.models.course_permission import CoursePermission, Role
from backend.application.models.group_chat import GroupChat
from backend.application.models.reaction import Reaction
from backend.application.models.user import User
from backend.application.validators.chat import CreateGroupSchema, GroupMessageSchema, PrivateMessageSchema, ReactSchema

user_bp = Blueprint('user_bp', __name__)
UNAUTHORIZED_TUPLE = ({"message":"Unauthorized"}, 401)
INVALID_INPUT_TUPLE = ({"message": "Invalid Input"}, 400)

@user_bp.route('/v1/message/send/<course_id>', methods=['POST'])
@jwt_required()
@expects_json(PrivateMessageSchema, check_formats=True)
def send_private_message(course_id):
    try:
        user = get_jwt_identity()
        to_user_contact = Contact.objects.get(email = g.data["to_user"])
        to_user = User.objects.get(contact = to_user_contact)
        course = Course.objects.get(uid = course_id)
        chat = Chat.objects(members__all = [user, to_user], course = course)
        
        if len(chat) == 0:
            chat = Chat(members = [user, to_user], course = course)
            chat.save()
        else:
            chat = chat[0]
        message = ChatMessage(message = g.data['message'], \
                              chat_instance = chat)
        message.save()
        return ChatMessage.objects(chat_instance = chat).to_mongo()
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE
 
@user_bp.route('/v1/message/send/group/<course_id>/<channel>', methods=['POST'])
@jwt_required()
@expects_json(GroupMessageSchema, check_formats=True)       
def send_group_message(course_id, channel):
    try:
        user = get_jwt_identity()
        course = Course.objects.get(uid = course_id)
        if CoursePermission.objects.get(course_id = course, user_id = user, \
                                        role = Role.STUDENT) == None:
            return INVALID_INPUT_TUPLE
        chat = GroupChat.objects(course = course, channel_name = channel)
        
        if len(chat) == 0:
            chat = GroupChat(course = course, channel_name = channel)
            chat.save()
        else:
            chat = chat[0]
        message = ChatMessage(message = g.data['message'], \
                              chat_instance = chat)
        message.save()
        return ChatMessage.objects(chat_instance = chat).to_mongo()
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE


@user_bp.route('/v1/message/<course_id>', methods=['GET'])
@jwt_required()
def get_chats(course_id):
    try:
        user = get_jwt_identity()
        course = Course.objects.get(uid = course_id)
        chats = Chat.objects(members__all = [user], course = course)
        chats.append(GroupChat.objects(course = course))
        messages = []
        for chat in chats:
            messages += ChatMessage.objects(chat_instance = chat)
        for message in messages:
            message.update(state = MessageState.READ)
        return [message.to_mongo() for message in messages]
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

@user_bp.route('/v1/message/create/group/<course_id>/<channel>', methods=['POST'])
@jwt_required()
@expects_json(CreateGroupSchema, check_formats=True)
def create_channel(course_id, channel):
    try:
        user = get_jwt_identity()
        course = Course.objects.get(course_id = course_id)
        if CoursePermission.objects.get(course_id = course, user_id = user, \
                                        role = Role.STUDENT) == None and \
           GroupChat.objects.get(channel_name = channel, \
                                 course = course) != None:
            return INVALID_INPUT_TUPLE
        chat = GroupChat(channel_name = g.data['channel_name'], \
                         course = course)
        chat.save()
        return chat.to_mongo()
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

@user_bp.route('/v1/message/react/<course_id>', methods=['POST'])
@jwt_required()
@expects_json(ReactSchema, check_formats=True)
def react_to_message(course_id):
    try: 
        user = get_jwt_identity()
        course = Course.objects.get(course_id = course_id)
        if CoursePermission.objects.get(course_id = course, user_id = user, \
                                            role = Role.STUDENT) == None:
            return INVALID_INPUT_TUPLE
        message = ChatMessage(uid = g.data['uid'], course = course)
        reaction = Reaction(user = user, reaction = g.data['reaction'])
        reaction.save()
        message.update(add_to_set__reactions = [reaction])
        return message.to_mongo()
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

