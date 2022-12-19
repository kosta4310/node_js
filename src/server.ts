import http from 'node:http';
import EventEmitter from 'node:events';
import { Router } from './app/Router';
import { Application } from './app/Application';

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
  const app = new Application();
  router.get('/api/users', (req, res) => {
    res.end('get request');
  });
  app.addRouter(router);
  app.listen(port);
}
