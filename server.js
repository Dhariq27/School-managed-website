// Dependency-free Node server: serves ./public and stores demo state as JSON in ./data/state.json
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 3000, PUB = path.join(__dirname, 'public'), DATA = path.join(__dirname, 'data'), FILE = path.join(DATA, 'state.json');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
fs.mkdirSync(DATA, { recursive: true });

function send(res, code, body, type = 'application/json') { res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' }); res.end(body); }

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/api/state') {
    if (req.method === 'GET') return fs.existsSync(FILE) ? send(res, 200, fs.readFileSync(FILE)) : send(res, 404, '{"error":"no state yet"}');
    if (req.method === 'PUT') {
      let b = ''; req.on('data', c => { b += c; if (b.length > 15e6) req.destroy(); });
      return req.on('end', () => { try { JSON.parse(b); fs.writeFileSync(FILE, b); send(res, 200, '{"ok":true}'); } catch (e) { send(res, 400, '{"error":"invalid JSON"}'); } });
    }
    if (req.method === 'DELETE') { if (fs.existsSync(FILE)) fs.unlinkSync(FILE); return send(res, 200, '{"ok":true}'); }
    return send(res, 405, '{"error":"method not allowed"}');
  }
  let p = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[\/\\])+/, '');
  if (p.endsWith(path.sep) || p === '.') p = path.join(p, 'index.html');
  const f = path.join(PUB, p);
  if (!f.startsWith(PUB)) return send(res, 403, 'Forbidden', 'text/plain');
  fs.readFile(f, (e, d) => e ? send(res, 404, 'Not found', 'text/plain') : send(res, 200, d, MIME[path.extname(f)] || 'application/octet-stream'));
}).listen(PORT, () => console.log(`School ERP demo running at http://localhost:${PORT}`));
