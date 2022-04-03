SubmissionCreationSchema = {
    'type': 'object',
    'properties': {
        'answer': {'type': 'string', 'minLength': 10, 'maxLength': 1000},
        'submission_date': {
            "type": "string",
            "format": "YYYY-MM-DD"
        }
    },
    "required": ["title", "description", "start_date", "due_date"]
}
