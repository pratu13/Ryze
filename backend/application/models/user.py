from mongoengine import Document
from mongoengine import DateTimeField, StringField, ListField


class User(Document):
    password = StringField()
