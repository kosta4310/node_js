import http from 'node:http';
import EventEmitter from 'node:events';
import { Router } from './app/Router';

const emitter = new EventEmitter();

// endpoints = {
//   'api/users': {
//     method: (req, res) => void
//   },
//   'api/users:id': {
//     method: (req, res) => void
//   }
// };

export function createWorkerServer(port: number) {
  const router = new Router();

  router.get('/api/users', (req, res) => {
    res.end('get request');
  });

  const server = http.createServer((req, res) => {
    const emitted = emitter.emit(`${req.url}-${req.method}`, req, res);
    if (!emitted) {
      res.end('not found');
    }
    res.end();
  });
  server.listen(port);
}
