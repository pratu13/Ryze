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

    def serialize(self):
        return {
            "uid":str(self.uid),
            "created_by": str(self.user_id),
            "text": self.text,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_active": self.is_active,
            "course_id": self.course_id.uid
        }
