#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Python 2.7
#

_index = 'PA-utils-js-index.html'
_templateData = \
	'PCFkb2N0eXBlIGh0bWw+DQo8aHRtbCBsYW5nPSJlbiI+DQo8aGVhZD4NCjxtZXRh' \
	'IGNoYXJzZXQ9IlVURi04Ij4NCjxtZXRhIG5hbWU9IkdlbmVyYXRvciIgY29udGVu' \
	'dD0iRWRpdFBsdXPCriI+DQo8dGl0bGU+UGEgVXRpbHMgSlMgMjAxNzwvdGl0bGU+' \
	'DQo8L2hlYWQ+DQo8Ym9keT4NCg0KPGgxPlBhIFV0aWxzIEpTIDIwMTc8L2gxPg0K' \
	'DQo8dWwgaWQ9Imxpc3QiPjwvdWw+DQoNCjwvYm9keT4NCjwvaHRtbD4NCg=='
_skipFiles = [ _index, 'pa-utils-js-gernate-index-py2.py']

import base64, os

_template  = base64.b64decode( _templateData )
_files = os.listdir('.')

print _template
print _files

with open(_index, 'w') as fo:
	fo.write(
		_template.replace('<ul id="list"></ul>',
			'<ul id="list">\n' +
			 '\n'.join( [ '\t<li><a href="%s">%s</a></li>' % (f, f) for f in _files if f not in _skipFiles ] ) +
			'\n</ul>'
		)
	)
