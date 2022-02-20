from mongoengine import Document, EmailField, StringField, DateTimeField, UUIDField

class Contact(Document):
    uid = UUIDField()
    email = EmailField(unique = True)
    phone = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()