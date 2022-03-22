from datetime import datetime
from enum import Enum
import uuid
from mongoengine import Document, ReferenceField, StringField, \
    ListField, EnumField, DateTimeField, UUIDField, BooleanField

class MessageState(Enum):
    SENT = 'Sent'
    DELIVERED = 'Delivered'
    READ = 'Read'

class ChatMessage(Document):
    uid = UUIDField(default = uuid.uuid4, required = True)
    from_user = ReferenceField('User')
    message = StringField()
    chat_instance = ReferenceField('Chat')
    reactions = ListField(ReferenceField('Reaction'), default = list)
    state = EnumField(MessageState, default=MessageState.SENT)
    is_blocked = BooleanField(default=False)
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)
