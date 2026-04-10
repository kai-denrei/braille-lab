#!/usr/bin/env python3
"""Dev server for Braille Lab — serves static files + handles save API."""

import http.server
import json
import os

PORT = 8888
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_POST(self):
        if self.path == '/api/save':
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length))
            file_path = os.path.normpath(os.path.join(ROOT, body['file']))

            # Safety: only write within project directory
            if not file_path.startswith(ROOT):
                self.send_response(403)
                self.end_headers()
                self.wfile.write(b'forbidden')
                return

            with open(file_path, 'w') as f:
                f.write(body['content'])

            print(f"  Saved: {body['file']}")
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'ok': True}).encode())
        else:
            self.send_response(404)
            self.end_headers()


if __name__ == '__main__':
    print(f"Braille Lab dev server on http://localhost:{PORT}")
    http.server.HTTPServer(('', PORT), Handler).serve_forever()
