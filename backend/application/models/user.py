from datetime import datetime
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
    name = StringField(default="")
    color = StringField(default="")
    recovery_options = ListField(ReferenceField('RecoveryOptions'), default=list)
    contact = ReferenceField('Contact')
    sessions = ListField(ReferenceField('Session'), default=list)
    duo_state = ReferenceField('DuoState')
    type = EnumField(UserType, default=UserType.USER)
    password = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()

    def __str__(self):
        if len(self.name) == 0:
            return "A user"
        return self.name
    
    def serialize(self):
        return {
            "uid":str(self.uid),
            "email": self.contact.email,
            "name": self.name if len(self.name) > 0 else "User"
        }

class DuoState(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    state = StringField(default="")
    created_at = DateTimeField(default=datetime.now)
    expiry = DateTimeField()
