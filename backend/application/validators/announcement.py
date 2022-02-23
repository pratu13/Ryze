AnnouncementCreationSchema = {
    'type': 'object',
    'properties': {
        'text': {'type': 'string', 'minLength': 10, 'maxLength': 200},
    },
    "required": ["text"]
}
