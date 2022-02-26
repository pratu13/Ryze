CourseCreationSchema = {
    'type': 'object',
    'properties': {
        'color': {'type': 'string', 'minLength': 6, 'maxLength': 6},
        'name': {'type': 'string', 'minLength': 5},
        'description': {'type': 'string', 'maxLength': 1000}
    },
    "required": ["color", "name", "description"]
}


