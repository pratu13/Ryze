from mongoengine import Document
from mongoengine import DateTimeField, StringField, ListField, UUIDField,\
    ReferenceField
import uuid


class User(Document):
    uid = UUIDField(default=uuid.uuid4(), required=True)
    recovery_options = ListField(ReferenceField('RecoveryOptions'), default=list)
    contact = ReferenceField('Contact')
    sessions = ListField(ReferenceField('Session'), default=list)
    password = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()
