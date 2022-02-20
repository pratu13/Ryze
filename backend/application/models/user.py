from mongoengine import Document
from mongoengine import DateTimeField, StringField, ListField, UUIDField


class User(Document):
    uid = UUIDField()
    recovery_options_ids = ListField(UUIDField(), default = list)
    # TODO: Use GenericRefField
    contacts_id = UUIDField()
    sessions = ListField(UUIDField(), default = list)
    password = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()
