from flask import Flask
from flask_cors import CORS
from .application import create_app
# from controllers.plot import plot_api

# Defines the Flask app
app = create_app()
# Cross Origin Resource Sharing (CORS) is enabled for the app
CORS(app)

# app.register_blueprint(plot_api)


@app.route('/')
def check():
    return "Ryze backend running"


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
