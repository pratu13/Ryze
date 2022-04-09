AssignmentSubmissionSchema = {
    'type': 'object',
    'properties': {
        'answer': {'type': 'string', 'minLength': 10, 'maxLength': 2000},
    },
    "required": ['answer']
}