from flask import Flask
from flask_cors import CORS
from .controllers.user import user_bp
from .controllers.course import course_bp
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
load_dotenv()


def create_app():
    app = Flask(__name__)
    if not hasattr(app, 'prod'):
        app.production = not app.debug and not app.testing
    app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
    jwt = JWTManager(app)
    register_blueprint(app)
    CORS(app)
    return app


def register_blueprint(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(course_bp)
