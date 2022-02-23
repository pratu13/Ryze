from mongoengine import UUIDField, StringField, DateTimeField, Document
import uuid


class RecoveryOptions(Document):
    uid = UUIDField(default=uuid.uuid4, required=True)
    question = StringField()
    answer = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()


defaultQuestions = { \
    "questions": [ \
        "What is the name of your first pet?", \
        "Why Agile is better than Waterfall?", \
    ] \
}