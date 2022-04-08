SubmissionCreationSchema = {
    'type': 'object',
    'properties': {
        'answer': {'type': 'string', 'minLength': 10, 'maxLength': 1000},
    },
    "required": ["title", "description", "start_date", "due_date"]
}
