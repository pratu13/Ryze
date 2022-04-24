SimpleSearchSchema = {
    "type": "object",
    "properties": {
        "query": {"type": "string", "minLength": 3},
        "sort_by": {"type": "string", "enum": ["date", "name"]},
    },
    "required" : ["query"]
}

AdvancedSearchSchema = {
    "type": "object",
    "properties": {
        "field": {"type": "string", "enum": ["assignment", "announcement"]},
        "query": {"type": "string", "minLength": 3},
        "sort_by": {"type": "string", "enum": ["date", "name"]},
    },
    "required" : ["query"]
}