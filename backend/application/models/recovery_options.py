from mongoengine import UUIDField, StringField, DateTimeField, Document

class RecoveryOptions(Document):
    uid = UUIDField()
    question = StringField()
    answer = StringField()
    created_at = DateTimeField()
    updated_at = DateTimeField()

defaultQuestions = [ \
    RecoveryOptions(question = "What is the name of your first pet?"), \
    RecoveryOptions(question = "Which Agile methodology do you use?"), \
]