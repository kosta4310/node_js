import { rmSync } from 'node:fs';
import http from 'node:http';

export function testServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('hello');
  });
  return server;
  // server.listen(4000, () => console.log('server is created'));
}

// testServer();
