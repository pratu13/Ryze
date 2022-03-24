
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
        "channel": {"type":"string"}
    },
    "required":["message", "channel"]
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

BlockMessageSchema = {
    "type": "object",
    "properties" : {
        "uid": {"type":"string"},
    },
    "required":["uid"]
}