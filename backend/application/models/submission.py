from mongoengine import Document, ReferenceField, StringField,\
    DateTimeField, UUIDField
import datetime
import uuid

class AssignmentSubmission(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    user_id = ReferenceField('User')
    course_id = ReferenceField('Course')
    assignment_id = ReferenceField('Assignment')
    answer = StringField(max_length=2000)
    submitted_at = DateTimeField(default=datetime.datetime.now)