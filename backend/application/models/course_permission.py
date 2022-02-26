from mongoengine import Document, ReferenceField,\
    DateTimeField, UUIDField, EnumField
from enum import Enum
import datetime
import uuid


class Role(Enum):
    TEACHER = 'TEACHER'
    STUDENT = 'STUDENT'
    ASSISTANT = 'ASSISTANT'


class CoursePermission(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    course_id = ReferenceField('Course')
    user_id = ReferenceField('User')
    role = EnumField(Role, default=Role.STUDENT)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)
