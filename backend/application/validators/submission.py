AssignmentSubmissionSchema = {
    'type': 'object',
    'properties': {
        'title': {'type': 'string', 'minLength': 5, 'maxLength': 200},
        'Answer': {'type': 'string', 'minLength': 10, 'maxLength': 2000},
        'submission_date': {
            'type': 'string',
            'format': 'YYYY-MM-DD'
        }
    },
    "required": ['Answer']
}