import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';
import { getDirname } from './utils/getDirname.js';

const __dirname = getDirname(import.meta.url);
const me = 'dfkdjf';

// console.log(import.meta.url);
console.log('hello from master');

const server = http
  .createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/api/users') {
      console.log('success');
    } else {
      console.log('not found');
    }

    res.end('hello from server');
  })
  .listen(4000, () => console.log('server is running on port 4000'));

server.on('error', () => console.log('error'));
server.on('close', () => console.log('close'));
