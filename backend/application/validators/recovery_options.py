RecoveryOptionsSchema = {
    "type": "object",
    "properties" : {
        "question": {"type":"string"},
        "answer":{"type":"string"}
    },
    "required":["question", "answer"]
}