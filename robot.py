from time import sleep
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pymongo import MongoClient, DESCENDING
import os

MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
comment_collection = client.cb.comments


def get_comments(soup):
    comments = []
    for one in soup.select('li'):
        comment = one.select('.jh_title')[0].text
        location = one.select('strong')[0].text
        title = one.select('a')[-1].text
        href = one.a['href']
        comment = dict(comment=comment,
                       location=location,
                       title=title,
                       href=href,
                       datetime=datetime.now())
        print(comment)
        sleep(0.1)
        comments.append(comment)
    return comments


def save_history():
    for i in range(50, 0, -1):
        resp = requests.get('http://m.cnbeta.com/jh_{}.htm'.format(i))
        soup = BeautifulSoup(resp.content.decode(), 'html.parser')
        comments = get_comments(soup)[::-1]
        comment_collection.insert_many(comments)


def save_new():
    resp = requests.get('http://m.cnbeta.com/mobile/m/jh')
    soup = BeautifulSoup(resp.content.decode(), 'html.parser')
    new_comments = get_comments(soup)

    recent_comments = comment_collection.find().sort('datetime', DESCENDING).limit(20)
    recent_comments = [one['comment'] for one in recent_comments]

    new_comments = [one for one in new_comments if one['comment'] not in recent_comments]

    if new_comments:
        comment_collection.insert_many(new_comments)
    print('{} comment(s) saved!'.format(len(new_comments)))


if __name__ == '__main__':
    save_new()
