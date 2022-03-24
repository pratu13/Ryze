
from datetime import datetime
from mongoengine import Document, ReferenceField, StringField, \
    ListField, UUIDField, DateTimeField
import uuid


class Chat(Document):
    uid = UUIDField(default = uuid.uuid4, required = True)
    members = ListField(ReferenceField('User'), default=list)
    course = ReferenceField('Course')
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)
    meta = {'allow_inheritance': True}


