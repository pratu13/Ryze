from flask import jsonify, make_response
from application import create_app
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
import os
from jsonschema import ValidationError

load_dotenv()

app = create_app()
app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('URI'),
    'DB': os.getenv('DATABASE_NAME'),
    'alias': 'default'
}
db = MongoEngine(app)


@app.route('/')
def check():
    return "Ryze backend running"

@app.errorhandler(400)
def validation_failure(error):
    if isinstance(error.description, ValidationError):
        return make_response(jsonify({'message': error.description.message}), 400)
    return error

if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
