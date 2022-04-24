from mongoengine import Document, ReferenceField, StringField,\
    DateTimeField, UUIDField,BooleanField
import datetime
import uuid


class Assignment(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    user_id = ReferenceField('User')
    course_id = ReferenceField('Course')
    title = StringField(max_length=200)
    description = StringField(max_length=1000)
    is_active = BooleanField(default=True)
    start_date = DateTimeField()
    due_date = DateTimeField()
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)

    def serialize(self):
        return {
            "uid":str(self.uid),
            "created_by": str(self.user_id),
            "title": self.title,
            "description": self.description,
            "start_date": self.start_date,
            "due_date": self.due_date,
            "course_id": self.course_id.uid
        }
