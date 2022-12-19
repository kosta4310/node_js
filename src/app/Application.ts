import http, { Server } from 'node:http';
import EventEmitter from 'node:events';
import { Router } from './Router';

// endpoints = {
//   'api/users': {
//     method: (req, res) => void
//   },
//   'api/users:id': {
//     method: (req, res) => void
//   }
// };

export class Application {
  emitter: EventEmitter;
  server: Server;
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
  }

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];
        this.emitter.on(`${path}-${method}`, (req, res) => handler(req, res));
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      const emitted = this.emitter.emit(`${req.url}-${req.method}`, req, res);
      if (!emitted) {
        res.end('not found');
      }
      res.end();
    });
  }

  listen(port: number, cb?: () => void) {
    this.server.listen(port, cb);
  }
}
