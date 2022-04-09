CreateGradeSchema = {
    "type": "object",
    "properties": {
        "user": {"type": "string"},
        "score": {"type": "string"},
        "max_score": {"type": "string", "default": "100"},
        "comment": {"type": "string"}
    },
    "required" : ["user", "score"]
}

UpdateGradeSchema = {
    "type": "object",
    "properties": {
        "score": {"type": "string"},
        "max_score": {"type": "string", "default": "100"},
        "comment": {"type": "string"}
    }
}