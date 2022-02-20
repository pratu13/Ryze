from mongoengine import Document, EmailField, StringField, DateTimeField, UUIDField

class Contact(Document):
    uid = UUIDField()
    email = EmailField()
    phone = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()