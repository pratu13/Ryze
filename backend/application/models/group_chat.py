import uuid

from .chat import Chat
from mongoengine import StringField


class GroupChat(Chat):
    channel_name = StringField(default = "default")