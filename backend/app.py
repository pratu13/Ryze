from flask import jsonify, make_response, current_app
from application import create_app
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
import os
from jsonschema import ValidationError
import sys
#from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from raven.contrib.flask import Sentry
from flask_security import Security, UserMixin, RoleMixin, auth_required
from flask_mail import Mail
from flask_dance.contrib.google import make_google_blueprint, google


if os.getenv("PRODUCTION") == None:
    print("Not production")
    load_dotenv()

app = create_app()
app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('URI'),
    'DB': os.getenv('DATABASE_NAME'),
    'alias': 'default'
}
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'whisker7864@gmail.com'
app.config['MAIL_PASSWORD'] = 'Adrian@22'
app.config["MAIL_DEBUG"] = True
app.config["GOOGLE_OAUTH_CLIENT_ID"] = os.environ.get("828763430966-ul3g3g8qvnn0gvephbn15liov5rkrge6.apps.googleusercontent.com")
app.config["GOOGLE_OAUTH_CLIENT_SECRET"] = os.environ.get("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")
app.config['INTEGRATION_KEY'] = 'DI1EUC5LINTJS0AAXNJA'
app.config['SECRET_KEY'] = 'IOE6YIyQCr4rjqHhHILIcFQ1qeqlHOvEDJeRwdvB'
app.config['API_HOSTNAME'] = 'IOE6YIyQCr4rjqHhHILIcFQ1qeqlHOvEDJeRwdvB'
db = MongoEngine(app)

Security()
#login_manager = LoginManager()
#login_manager.init_app(app)

sentry = Sentry(app)
google_bp = make_google_blueprint(scope=["profile","email"])
app.register_blueprint(google_bp, url_prefix='/glogin')

@app.route('/')
def check():
    return "Ryze backend running"


@app.errorhandler(400)
def validation_failure(error):
    print('b')
    print(error)
    print('a')
    if isinstance(error.description, ValidationError):
        return make_response(jsonify({'message': error.description.message}), 400)
    return error


if __name__ == '__main__':
    host = "localhost"
    port = 8000
    if len(sys.argv) > 1:
        host = sys.argv[1]
    port = int(os.getenv("PORT", 8000))
    app.run(host = host, port = port, debug=True)
