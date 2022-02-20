from application import create_app
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
import os
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


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
