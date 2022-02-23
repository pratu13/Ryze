from mongoengine import *
import uuid

VALIDITY = 3600 * 1


class Session(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    token = StringField()
    # TODO: Use GenericRefField
    provider_id = UUIDField()
    valid_until = DateTimeField()
    created_at = DateTimeField()
