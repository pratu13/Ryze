from mongoengine import Document, EmailField, StringField, DateTimeField, UUIDField
import uuid


class Contact(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    email = EmailField()
    phone = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()
