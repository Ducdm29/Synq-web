#!/usr/bin/env python3
"""Local preview that applies vercel.json redirects + rewrites.
   python3 tools/preview.py [port]   ->  http://localhost:4173"""
import http.server, json, os, re, sys, socketserver
from urllib.parse import urlsplit

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PUB = os.path.join(ROOT, 'public')
CFG = json.load(open(os.path.join(ROOT, 'vercel.json')))

def compile_rule(src):
    pat = re.sub(r':(\w+)', r'(?P<\1>[^/]+)', re.escape(src).replace('\\:', ':'))
    return re.compile('^' + pat + '$')

REDIR = [(compile_rule(r['source']), r) for r in CFG.get('redirects', [])]
REW = [(compile_rule(r['source']), r) for r in CFG.get('rewrites', [])]

def fill(dest, m):
    for k, v in m.groupdict().items(): dest = dest.replace(':' + k, v)
    return dest

def resolve(path):
    """returns ('redirect', status, dest) | ('file', fspath) | ('404',)"""
    for rx, r in REDIR:
        m = rx.match(path)
        if m: return ('redirect', 308 if r.get('permanent') else 307, fill(r['destination'], m))
    fs = os.path.join(PUB, path.lstrip('/'))
    if os.path.isfile(fs): return ('file', fs)
    for rx, r in REW:
        m = rx.match(path)
        if m:
            fs = os.path.join(PUB, fill(r['destination'], m).lstrip('/'))
            return ('file', fs) if os.path.isfile(fs) else ('404',)
    return ('404',)

class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path): return path
    def _route(self):
        r = resolve(urlsplit(self.path).path)
        if r[0] == 'redirect':
            self.send_response(r[1]); self.send_header('Location', r[2]); self.end_headers(); return False
        if r[0] == '404':
            self.send_error(404); return False
        self.path = r[1]; return True
    def do_GET(self):
        if self._route(): http.server.SimpleHTTPRequestHandler.do_GET(self)
    def do_HEAD(self):
        if self._route():
            f = self.send_head()
            if f: f.close()
    def send_head(self):
        path = self.path
        ctype = self.guess_type(path)
        try: f = open(path, 'rb')
        except OSError: self.send_error(404); return None
        fs = os.fstat(f.fileno())
        self.send_response(200); self.send_header('Content-Type', ctype); self.send_header('Content-Length', str(fs.st_size))
        self.send_header('Cache-Control', 'no-cache'); self.end_headers(); return f
    def log_message(self, *a): pass

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(('127.0.0.1', port), H) as s:
        print(f'http://localhost:{port}'); s.serve_forever()
