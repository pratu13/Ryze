ContactSchema = {
    "type": "object",
    "properties" : {
        "email": {"type":"string", "format":"email"},
    },
    "required":["email"]
}

RecoveryOptionsSchema = {
    "type": "object",
    "properties" : {
        "question": {"type":"string"},
        "answer":{"type":"string"}
    },
    "required":["question", "answer"]
}

VerifyRecoveryOptionsSchema = {
    "type": "object",
    "properties" : {
        "uid": {"type":"string"},
        "answer":{"type":"string"},
        "password":{"type":"string", "minLength": 8}
    },
    "required":["uid", "answer", "password"]
}
RegistrationSchema = {
    'type': 'object',
    'properties': {
        "contact": ContactSchema,
        'password': {'type':'string', 'minLength': 8},
        'recovery_options': {
            "type": "array",
            "items": RecoveryOptionsSchema,
            "minItems": 1,
            "uniqueItems": True
        },
    },
    "required": ["contact", "password", "recovery_options"]
}

LoginRequestSchema = {
    "type": "object",
    "properties": {
        "provider": {"type": "string"},
        "email": {"type": "string", "format":"email"},
        "password": {"type":"string"}
    },
    "required" : ["email"]
}