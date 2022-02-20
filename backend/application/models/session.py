from mongoengine import *

VALIDITY = 3600 * 1
class Session(Document):
    uid = UUIDField()
    token = StringField()
    # TODO: Use GenericRefField
    provider_id = UUIDField()
    valid_until = DateTimeField()
    created_at = DateTimeField()
