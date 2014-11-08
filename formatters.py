import datetime

BLACK = 0
RED = 1
GREEN = 2
YELLOW = 3
BLUE = 4
PURPLE = 5
CYAN = 6
WHITE = 7

NORMAL = 0
BOLD = 1
UNDERLINE = 4


class ColorFormatter:
        def __init__(self):
            self._fmt = None
            pass

        def format(self, data, *args):
            colors = {
                'ERROR': RED,
                'WARNING': YELLOW,
                'EXCEPTION': RED,
                'DEBUG': CYAN,
                'INFO': GREEN,
                'CRITICAL': BLUE
            }
            levelnames = {
                'DEBUG': 'DBG',
                'INFO': 'INF',
                'WARNING': 'WRN',
                'ERROR': 'ERR',
                'CRITICAL': 'CRT'
            }
            levelname = levelnames[data.levelname]
            try:
                msg = data.msg % data.args
            except:
                msg = data.msg
            return '%s | %s | %s | %s%s' % (datetime.datetime.fromtimestamp(int(data.created)).strftime('%d-%m-%Y %H:%M:%S.') + str(int(data.msecs)).rjust(3, '0'), str(data.module).ljust(12, ' ') + str(': ' + str(data.lineno)).rjust(6, ' '), levelname, color(color=colors[data.levelname]), msg) + color()


def color(color=None, style=BOLD, background=None):
    if color is None and background is None:
            return chr(27) + '[0m'
    return (chr(27) + '[%dm' % background + 40 if background is not None else '') + chr(27) + '[%d;%dm' % (style, color + 30)
