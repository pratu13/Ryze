from flask import Flask
from flask_cors import CORS
from .controllers.user import user_bp
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)
    if not hasattr(app, 'prod'):
        app.production = not app.debug and not app.testing
    register_blueprint(app)
    CORS(app)
    return app


def register_blueprint(app):
    app.register_blueprint(user_bp)
