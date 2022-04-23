<<<<<<< HEAD
from mongoengine import Document, ReferenceField, StringField,\
    DateTimeField, UUIDField
import datetime
import uuid

class AssignmentSubmission(Document):
=======
from urllib import request
from mongoengine import Document, ReferenceField, StringField,\
    DateTimeField, UUIDField,BooleanField
import datetime
import uuid


class Submission(Document):
>>>>>>> 6c1ea2a19487ee9635bbd88601f3635bf6886de4
    uid = UUIDField(default=uuid.uuid4, required=True)
    user_id = ReferenceField('User')
    course_id = ReferenceField('Course')
    assignment_id = ReferenceField('Assignment')
<<<<<<< HEAD
    answer = StringField(max_length=2000)
    submitted_at = DateTimeField(default=datetime.datetime.now)
=======
    answer = StringField(max_length=1000, required=True)
    is_active = BooleanField(default=True)
    submission_date = DateTimeField(default=datetime.datetime.now)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
>>>>>>> 6c1ea2a19487ee9635bbd88601f3635bf6886de4
