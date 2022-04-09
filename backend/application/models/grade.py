
from datetime import datetime
from decimal import Decimal
from mongoengine import Document, ReferenceField, StringField, \
    ListField, UUIDField, DateTimeField, DecimalField
import uuid


class Grade(Document):
    uid = UUIDField(default = uuid.uuid4, required = True)
    assignment = ReferenceField('Assignment')
    user = ReferenceField('User')
    graded_by = ReferenceField('User')
    comment = StringField()
    score = DecimalField()
    max_score = DecimalField()
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)


