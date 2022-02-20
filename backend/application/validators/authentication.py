LoginRequestSchema = {
    "type": "object",
    "properties": {
        "provider": {"type": "string"},
        "email": {"type": "string", "format":"email"},
        "password": {"type":"string"}
    },
    "required" : ["email"]
}