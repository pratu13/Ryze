from urllib import request
from mongoengine import Document, ReferenceField, StringField,\
    DateTimeField, UUIDField,BooleanField
import datetime
import uuid


class Submission(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    user_id = ReferenceField('User')
    course_id = ReferenceField('Course')
    assignment_id = ReferenceField('Assignment')
    answer = StringField(max_length=1000)
    is_active = BooleanField(default=True)
    submission_date = DateTimeField(default=datetime.datetime.now)
    submission_link = StringField(max_length=200)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
