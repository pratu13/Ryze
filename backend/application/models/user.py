from mongoengine import Document
from mongoengine import DateTimeField, StringField, ListField, UUIDField,\
    ReferenceField, EnumField
import uuid
from enum import Enum


class UserType(Enum):
    USER = 'USER'
    ADMIN = 'ADMIN'


class User(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    recovery_options = ListField(ReferenceField('RecoveryOptions'), default=list)
    contact = ReferenceField('Contact')
    sessions = ListField(ReferenceField('Session'), default=list)
    type = EnumField(UserType, default=UserType.USER)
    password = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()
