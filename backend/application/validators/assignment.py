AssignmentCreationSchema = {
    'type': 'object',
    'properties': {
        'title': {'type': 'string', 'minLength': 5, 'maxLength': 200},
        'description': {'type': 'string', 'minLength': 5, 'maxLength': 1000},
        'start_date': {
            "type": "string",
            "format": "YYYY-MM-DD"
        },
        'due_date': {
            "type": "string",
            "format": "YYYY-MM-DD"
        }
    },
    "required": ["title", "description", "start_date", "due_date"]
}
