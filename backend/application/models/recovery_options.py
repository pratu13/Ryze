from mongoengine import UUIDField, StringField, DateTimeField, Document

class RecoveryOptions(Document):
    uid = UUIDField()
    question = StringField()
    answer = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()

defaultQuestions = { \
    "questions": [ \
        "What is the name of your first pet?", \
        "Which Agile methodology do you use?", \
    ] \
}