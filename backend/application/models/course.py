from mongoengine import Document, ReferenceField, StringField,\
    DateTimeField, UUIDField,BooleanField
import datetime
import uuid


class Course(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    color = StringField()
    user_id = ReferenceField('User')
    name = StringField(min_length=5)
    description = StringField(max_length=20000)
    is_active = BooleanField(default=True)
    published_at = DateTimeField(default=datetime.datetime.now)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)

    def serialize(self):
        return {
            "id": self.uid,
            "name": self.name,
            "color": self.color,
            "description": self.description,
            "published_at": self.published_at,
            "created_by": str(self.user_id)
        }
