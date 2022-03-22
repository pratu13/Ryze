from datetime import datetime
from enum import Enum
import uuid
from mongoengine import Document, ReferenceField, StringField, \
    DateTimeField, UUIDField

class Reaction(Document):
    uid = UUIDField(default = uuid.uuid4, required = True)
    user = ReferenceField('User')
    reaction = StringField()
    created_at = DateTimeField(default = datetime.now)
    updated_at = DateTimeField(default = datetime.now)