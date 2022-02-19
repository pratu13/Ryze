import os
from pymongo import MongoClient


db = MongoClient(os.getenv('URI'))[os.getenv('DATABASE_NAME')]

# Add collections in this list
collections = ['users', 'contact']

for collection in collections:
    if collection in db.list_collection_names():
        print(collection + ' exists')
    else:
        db[collection]
