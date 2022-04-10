SubmissionCreationSchema = {
    'type': 'object',
    'properties': {
        'answer': {'type': 'string', 'minLength': 10, 'maxLength': 1000},
    },
    "required": ["answer"]
}
