from email.policy import default
from enum import Enum
from mongoengine import *

class ProviderType(Enum):
    INTERNAL = 'Internal'
    EXTERNAL = 'External'

class Provider(Document):
    uid = UUIDField()
    name = StringField()
    api_key = StringField()
    provider_type = EnumField(ProviderType, default = ProviderType.INTERNAL)
    created_at = DateTimeField()