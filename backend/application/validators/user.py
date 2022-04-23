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

OAuthLoginRequestSchema = {
    "type": "object",
    "properties": {
        "provider": {"type": "string"},
        "contact": ContactSchema,
        "oauth_token": {"type":"string"}
    },
    "required" : ["contact", "oauth_token"]
}

ProfileUpdateSchema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "color": {"type":"string"}
    },
    "required": ["name", "color"]
}

PassRecoverThroughEmailSchema = {
    "type": "object",
    "properties" : {
        "email": {"type":"string", "format":"email"},
    },
    "required": ["email"]
}

PasswordResetEmailFlowSchema = {
    "type": "object",
    "properties" : {
        "token": { "type":"string" },
        "password":{ "type":"string", "minLength": 8 }
    },
    "required": ["token", "password"]
}

DuoCallbackSchema = {
    "type":"object",
    "properties": {
         "email": {"type": "string", "format":"email"},
         "state": {"type": "string", "minLength": 1},
         "duo_code": {"type": "string", "minLength": 1}
    },
    "required": ["email", "state", "duo_code"]
}