#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

from flask import (
    Flask,
    render_template,
    request,
    Response
)
from werkzeug.contrib.fixers import ProxyFix
from flask.ext.scss import Scss
import settings
import logging
from werkzeug.exceptions import Unauthorized
from json import dumps
from formatters import ColorFormatter

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


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/auth")
def auth():
    if request.args.get('email') == 'test' and request.args.get('password') == 'test':
        return dumps({'authorized': True, 'access_token': 12345678})
    else:
        raise Unauthorized


if __name__ == '__main__':
    # Run app
    app.run(host='0.0.0.0', port=8000)
