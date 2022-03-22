from datetime import datetime
from enum import Enum
from mongoengine import Document, ReferenceField, StringField, \
    ListField, EnumField, DateTimeField

class MessageState(Enum):
    SENT = 'Sent'
    DELIVERED = 'Delivered'
    READ = 'Read'

class ChatMessage(Document):
    message = StringField()
    chat_instance = ReferenceField('Chat')
    reactions = ListField(ReferenceField('Reaction'), default = list)
    state = EnumField(MessageState, default=MessageState.SENT)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
