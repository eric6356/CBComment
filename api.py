from flask import Flask
from flask.ext.cors import CORS
from pymongo import MongoClient, DESCENDING
import json
import os

app = Flask(__name__)
CORS(app)
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
comment_collection = client.cb.comments


def jsonp(func):
    def inner(*args, **kwargs):
        res = func(*args, **kwargs)
        return json.dumps(res)
    return inner


@app.route('/api/comment/<int:page>')
@jsonp
def comment(page):
    skip = (page - 1) * 10
    comments = list(comment_collection
                    .find(None, {'_id': False, 'datetime': False})
                    .sort('datetime', DESCENDING)
                    .skip(skip)
                    .limit(10))
    return comments

if __name__ == '__main__':
    app.run()
