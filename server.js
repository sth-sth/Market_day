const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function sendFile(filePath, res) {
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                res.end('404 Not Found');
                return;
            }
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('500 Internal Server Error');
            return;
        }

        res.writeHead(200, {
            'Content-Type': type,
            'Cache-Control': 'no-cache'
        });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const rawPath = decodeURIComponent(req.url.split('?')[0]);
    const requestPath = rawPath === '/' ? '/index.html' : rawPath;
    const normalizedPath = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');
    const filePath = path.join(ROOT, normalizedPath);

    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('403 Forbidden');
        return;
    }

    sendFile(filePath, res);
});

server.listen(PORT, HOST, () => {
    console.log(`Market_day server running at http://${HOST}:${PORT}`);
});
