from flask import jsonify, make_response
from application import create_app
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
import os
from jsonschema import ValidationError
import sys
from flask_mail import Mail,Message
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin, SQLAlchemyStorage
from flask_dance.consumer.storage import BaseStorage

if os.getenv("PRODUCTION") == None:
    print("Not production")
    load_dotenv()

app = create_app()
app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('URI'),
    'DB': os.getenv('DATABASE_NAME'),
    'alias': 'default'
}
db = MongoEngine(app)
db2 = SQLAlchemy(app)

@app.route('/')
def check():
    return "Ryze backend running"


@app.errorhandler(400)
def validation_failure(error):
    if isinstance(error.description, ValidationError):
        return make_response(jsonify({'message': error.description.message}), 400)
    return error


#app.config['MAIL_SERVER'] = 'smtp.gmail.com'
#app.config['MAIL_PORT'] = 587
#app.config['MAIL_USE_TLS'] = True
#app.config['MAIL_USERNAME'] = 'whisker7864@gmail.com'
#app.config['MAIL_PASSWORD'] = 'Adrian@22'
#mail = Mail(app)

if __name__ == '__main__':
    host = "localhost"
    port = 8000
    if len(sys.argv) > 1:
        host = sys.argv[1]
    port = int(os.getenv("PORT", 8000))
    app.run(host = host, port = port, debug=True)
