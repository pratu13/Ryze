from enum import Enum
from mongoengine import *
import uuid


class ProviderType(Enum):
    INTERNAL = 'Internal'
    EXTERNAL = 'External'


class Provider(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    name = StringField()
    api_key = StringField()
    provider_type = EnumField(ProviderType, default = ProviderType.INTERNAL)
    created_at = DateTimeField()
