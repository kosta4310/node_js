import http, { IncomingMessage, Server } from 'node:http';
import EventEmitter from 'node:events';
import { Router } from './Router';
import { URL } from 'node:url';

// endpoints = {
//   'api/users': {
//     method1: (req, res) => void
//     method2: (req, res) => void
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return http.createServer((req: IncomingMessage & Record<string, any>, res) => {
      const parsedUrl = new URL(req.url as string, 'http://localhost:5000');
      console.log(parsedUrl);

      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body);
        }

        const emitted = this.emitter.emit(`${req.url}-${req.method}`, req, res);
        if (!emitted) {
          res.end('not found');
        }
      });
    });
  }

  listen(port: number, cb?: () => void) {
    this.server.listen(port, cb);
  }
}
