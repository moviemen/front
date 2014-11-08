#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

from flask import (
    Flask,
    render_template,
    request,
    Response,
    session
)
from werkzeug.contrib.fixers import ProxyFix
from flask.ext.scss import Scss
import settings
import logging
from werkzeug.exceptions import Unauthorized, BadRequest
from json import dumps
from formatters import ColorFormatter
from time import time
from copy import copy

# Create app
app = Flask(__name__)
app.config.from_object(settings)
app.wsgi_app = ProxyFix(app.wsgi_app)
Scss(app, static_dir='./static/css', asset_dir='./static/scss')

# Set up logging
handler = logging.StreamHandler()
handler.setFormatter(ColorFormatter())
logger = logging.root
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)
log = logger


START = time()
INTERVAL = 30
SEASONS_PER_EPISODE = 10

DEFAULT_MOVIES = [
    dict(
        id=1,
        name='Some movie',
        url='http://google.com.ua',
        last_season=3,
        last_episode=5
    ),
    dict(
        id=2,
        name='Some other movie',
        url='http://google.com.ua',
        last_season=8,
        last_episode=14
    ),
    dict(
        id=3,
        name='Some completely another movie',
        url='http://google.com.ua',
        last_season=13,
        last_episode=37
    ),
]

users = {}
ID_SEQ = 4


def jsonify(fn):
    '''
    Decorator that allows Flask endpoints to return JSON objects.
    '''
    def wrapper(*args, **kwargs):
        result = fn(*args, **kwargs)
        result = dumps(result)
        return Response(result, headers={
            'Content-type': 'application/json',
        })
    for param in ('name', 'doc'):
        key = '__{}__'.format(param)
        setattr(wrapper, key, getattr(fn, key))
    return wrapper


def auth_required(fn):
    '''
    Decorator that requires user to be authenticated in order to get resource.
    '''
    def wrapper(*args, **kwargs):
        if session.get('id', None) is None:
            raise Unauthorized
        return fn(*args, **kwargs)
    for param in ('name', 'doc'):
        key = '__{}__'.format(param)
        setattr(wrapper, key, getattr(fn, key))
    return wrapper


def init_g():
    # Assumes that user is authorized.
    if not users.get('movies-{}'.format(session['id'])):
        users['movies-{}'.format(session['id'])] = copy(DEFAULT_MOVIES)


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/auth")
def auth():
    if request.args.get('email') == 'test' and request.args.get('password') == 'test':
        session['id'] = 1337
        return dumps({'authorized': True, 'access_token': 12345678})
    elif request.args.get('email') == 'test' and request.args.get('password') == 'test':
        session['id'] = 1337
        return dumps({'authorized': True, 'access_token': 12345678})
    else:
        raise Unauthorized


@app.route("/episodes/")
@jsonify
@auth_required
def movies():
    init_g()
    return users.get('movies-{}'.format(session['id']))


@app.route("/episodes/", methods=['POST'])
@jsonify
@auth_required
def add_movie():
    init_g()
    global ID_SEQ
    data = request.get_json()
    name = str(data.get('name', ''))
    if len(name) == 0:
        raise BadRequest('Missing name.')

    new_movie = dict(
        id=ID_SEQ,
        name=name,
        url=None,
        last_season=None,
        last_episode=None
    )
    users['movies-{}'.format(session['id'])].append(new_movie)
    ID_SEQ += 1

    return new_movie


@app.route("/episodes/<int:id>", methods=['DELETE'])
@jsonify
@auth_required
def delete_movie(id):
    init_g()
    global ID_SEQ
    user_movies = users.get('movies-{}'.format(session['id']))
    for movie in user_movies:
        if movie['id'] == id:
            user_movies.remove(movie)
    return True


@app.route('/rss.xml')
@jsonify
def rss():
    result = []
    diff = ((time() - START) / INTERVAL) + 10
    for i in xrange(0, 10):
        result.append({
            'title': 'Endless story, season {}, episode {}'.format(int((diff - i)/10) + 1, int((diff - i) % 10) + 1)
        })
    return result


if __name__ == '__main__':
    # Run app
    app.run(host='0.0.0.0', port=8000)
