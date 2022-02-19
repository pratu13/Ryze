from flask import Flask
from .models import db
from .controllers.user import user_bp


def create_app():
    app = Flask(__name__)
    if not hasattr(app, 'prod'):
        app.production = not app.debug and not app.testing
    register_extensions(app)
    register_blueprint(app)
    return app


def register_extensions(app):
    db.init_app(app)


def register_blueprint(app):
    app.register_blueprint(user_bp)
