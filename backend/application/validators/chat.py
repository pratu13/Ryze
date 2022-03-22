
PrivateMessageSchema = {
    "type": "object",
    "properties" : {
        "to_user": {"type":"string", "format":"email"},
        "message": {"type":"string"}
    },
    "required":["to_user", "message"]
}

GroupMessageSchema = {
    "type": "object",
    "properties" : {
        "message": {"type":"string"},
    },
    "required":["message"]
}

CreateGroupSchema = {
    "type": "object",
    "properties" : {}
}

ReactSchema = {
    "type": "object",
    "properties" : {
        "uid": {"type":"string"},
        "reaction": {"type": "string"}
    },
    "required":["uid", "reaction"]
}