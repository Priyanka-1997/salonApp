const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
http
  .createServer((req, res) => {
    const file = path.join(dir, path.basename(decodeURIComponent(req.url.split('?')[0])));
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' });
      res.end(data);
    });
  })
  .listen(8899, '127.0.0.1', () => console.log('shots server on 8899'));
