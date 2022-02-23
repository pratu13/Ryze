from mongoengine import Document, ReferenceField, StringField,\
    DateTimeField, UUIDField,BooleanField
import datetime
import uuid


class Announcement(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    user_id = ReferenceField('User')
    course_id = ReferenceField('Course')
    text = StringField(max_length=200)
    is_active = BooleanField(default=True)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
