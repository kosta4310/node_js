import EventEmitter from 'node:events';
import http from 'node:http';
import { Router } from './Router';

export type Req = http.IncomingMessage & Record<string, any>;
export type Res = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
} & Record<string, any>;

export class App {
  emitter: EventEmitter;
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  middleware: Array<
    (
      req: http.IncomingMessage & Record<string, any>,
      res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
      },
    ) => void
  >;
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middleware = [];
  }

  use(
    func: (
      req: http.IncomingMessage & Record<string, any>,
      res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
      },
    ) => void,
  ) {
    this.middleware.push(func);
  }

  _createServer() {
    return http.createServer((req: http.IncomingMessage & Record<string, any>, res) => {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body);
        }
        this.middleware.forEach((func) => func(req, res));
        const emitted = this.emitter.emit(`${req.url}-${req.method}`, req, res);
        if (!emitted) {
          res.end('not found');
        }
      });
    });
  }

  addRoute(route: Router) {
    Object.keys(route.endpoints).forEach((endpoint) => {
      const path = route.endpoints[endpoint];

      Object.keys(path).forEach((method) => {
        const handler = path[method];

        this.emitter.on(`${endpoint}-${method}`, (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  listen(port: number, cb: () => void) {
    this.server.listen(port, cb);
  }
}
