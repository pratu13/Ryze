from mongoengine import Document, ReferenceField, StringField,\
    DateTimeField, UUIDField,BooleanField
import datetime
import uuid


class Course(Document):
    uid = UUIDField(default=uuid.uuid4(), required=True)
    color = StringField()
    user_id = ReferenceField('User')
    name = StringField(min_length=5)
    description = StringField(max_length=1000)
    is_active = BooleanField(default=True)
    published_at = DateTimeField(default=datetime.datetime.now)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
