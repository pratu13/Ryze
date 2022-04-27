CourseCreationSchema = {
    'type': 'object',
    'properties': {
        'color': {'type': 'string'},
        'name': {'type': 'string', 'minLength': 5},
        'description': {'type': 'string', 'maxLength': 20000}
    },
    "required": ["color", "name", "description"]
}


