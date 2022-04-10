import logging
from urllib import response
from uuid import uuid4
from flask import Blueprint, g
from flask_expects_json import expects_json
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.chat import Chat
from ..models.chat_message import ChatMessage, MessageState

from ..models.contact import Contact
from ..models.course import Course
from ..models.course_permission import CoursePermission, Role
from ..models.group_chat import GroupChat
from ..models.reaction import Reaction
from ..models.user import User
from ..validators.chat import BlockMessageSchema, CreateGroupSchema, GroupMessageSchema, PrivateMessageSchema, ReactSchema

chat_bp = Blueprint('chat_bp', __name__)
UNAUTHORIZED_TUPLE = ({"message":"Unauthorized"}, 401)
INVALID_INPUT_TUPLE = ({"message": "Invalid Input"}, 400)

def serialize_message(message: ChatMessage, exclude_user: User = None):
    members = []
    if exclude_user != None:
        for member in message.chat_instance.members:
            if member == exclude_user:
                continue
            members += [str(member.contact.email)]
    return {
                "uid": message.uid,
                "chat": message.chat_instance.uid,
                "from": message.from_user.contact.email,
                "message": message.message,
                "state": message.state.value,
                "reactions": [{
                                "user": reaction.user.contact.email, 
                                "reaction":reaction.reaction,
                                "created_at": reaction.created_at,
                                "updated_at": reaction.updated_at
                            } for reaction in message.reactions],
                "is_blocked": message.is_blocked,
                "created_at": message.created_at,
                "updated_at": message.updated_at,
                "channel": getattr(message.chat_instance, "channel_name", None),
                "members": members
    }

@chat_bp.route('/v1/message/send/<course_id>', methods=['POST'])
@jwt_required()
@expects_json(PrivateMessageSchema, check_formats=True)
def send_private_message(course_id):
    try:
        user = User.objects.get(uid = get_jwt_identity())
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
                              chat_instance = chat, \
                              from_user = user)
        message.save()
        response = []
        for message in  ChatMessage.objects(chat_instance = chat):
            message: ChatMessage
            response.append(serialize_message(message, user))
        return {"messages": response}
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE
 
@chat_bp.route('/v1/message/send/group/<course_id>', methods=['POST'])
@jwt_required()
@expects_json(GroupMessageSchema, check_formats=True)       
def send_group_message(course_id):
    try:
        user = User.objects.get(uid = get_jwt_identity())
        channel = g.data["channel"]
        course = Course.objects.get(uid = course_id)
        if CoursePermission.objects.get(course_id = course, user_id = user) == None:
            return INVALID_INPUT_TUPLE
        chat = GroupChat.objects(course = course, channel_name = channel)
        
        if len(chat) == 0:
            chat = GroupChat(course = course, channel_name = channel)
            chat.save()
        else:
            chat = chat[0]
        message = ChatMessage(message = g.data['message'], \
                              chat_instance = chat, \
                              from_user = user)
        message.save()
        response = []
        for message in  ChatMessage.objects(chat_instance = chat):
            message: ChatMessage
            response.append(serialize_message(message, user))
        return {"messages": response}
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE


@chat_bp.route('/v1/message/<course_id>', methods=['GET'])
@jwt_required()
def get_chats(course_id):
    try:
        user = User.objects.get(uid = get_jwt_identity())
        course = Course.objects.get(uid = course_id)
        chats = []
        for chat in Chat.objects(members__all = [user], course = course):
            chats.append(chat)
        for chat in GroupChat.objects(course = course):
            chats.append(chat)
        messages = []
        for chat in chats:
            for msg in ChatMessage.objects(chat_instance = chat):
                messages += [msg]
        response = []
        for msg in messages:
            msg: ChatMessage
            msg.update(state = MessageState.READ)
            msg.state = MessageState.READ
            response.append(serialize_message(msg, user))
        return {"messages": response}
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

@chat_bp.route('/v1/message/create/group/<course_id>/<channel>', methods=['POST'])
@jwt_required()
@expects_json(CreateGroupSchema, check_formats=True)
def create_channel(course_id, channel):
    try:
        user = User.objects.get(uid = get_jwt_identity())
        course = Course.objects.get(course_id = course_id)
        if CoursePermission.objects.get(course_id = course, user_id = user) == None and \
           GroupChat.objects.get(channel_name = channel, \
                                 course = course) != None:
            return INVALID_INPUT_TUPLE
        chat: GroupChat
        chat = GroupChat(channel_name = g.data['channel_name'], \
                         course = course)
        chat.save()
        response = {
            "uid": chat.uid,
        }
        return response
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

@chat_bp.route('/v1/message/react/<course_id>', methods=['POST'])
@jwt_required()
@expects_json(ReactSchema, check_formats=True)
def react_to_message(course_id):
    try: 
        user = User.objects.get(uid = get_jwt_identity())
        course = Course.objects.get(uid = course_id)
        if CoursePermission.objects.get(course_id = course, user_id = user) == None:
            return INVALID_INPUT_TUPLE
        message = ChatMessage.objects.get(uid = g.data['uid'])
        reaction = Reaction(user = user, reaction = g.data['reaction'])
        reaction.save()
        message.update(add_to_set__reactions = [reaction])
        message.reactions += [reaction]
        response = serialize_message(message, user)
        return response
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE


@chat_bp.route('/v1/message/block/<course_id>', methods=['POST'])
@jwt_required()
@expects_json(BlockMessageSchema, check_formats=True)
def block_message(course_id):
    try: 
        user = User.objects.get(uid = get_jwt_identity())
        course = Course.objects.get(uid = course_id)
        if CoursePermission.objects.get(course_id = course, user_id = user, \
                                        role = Role.TEACHER) == None:
            return INVALID_INPUT_TUPLE
        message = ChatMessage.objects.get(uid = g.data['uid'])
        message.update(is_blocked = True)
        message.is_blocked = True
        response = serialize_message(message, user)
        return response
    except Exception as e:
        logging.exception(e)
        return INVALID_INPUT_TUPLE

