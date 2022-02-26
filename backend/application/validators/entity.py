EntityDisableSchema = {
    'type': 'object',
    'properties': {
        'entities': {
            "type": "array",
            "id": {'type': 'string'},
            "minItems": 1,
            "uniqueItems": True
        },
    },
    "required": ["entities"]
}
