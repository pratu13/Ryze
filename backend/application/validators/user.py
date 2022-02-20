from .contact import ContactSchema
from .recovery_options import RecoveryOptionsSchema

UserSchema = {
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