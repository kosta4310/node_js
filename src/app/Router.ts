import http from 'node:http';
// import EventEmitter from 'node:events';

// endpoints = {
//   '/api/users': {
//     "GET": handler,
//     "POST": handler
//   }
// }

// const emitter = new EventEmitter();
type Handler = (
  req: http.IncomingMessage & Record<string, any>,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) => void;

type MethodValue = {
  [key: string]: Handler;
};

type Endpoints = {
  [key: string]: MethodValue;
};
export class Router {
  endpoints: Endpoints;

  constructor() {
    this.endpoints = {};
  }

  _request(method = 'GET', path: string, handler: Handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error('This route already exist');
    }
    endpoint[method] = handler;
  }

  get(path: string, handler: Handler) {
    this._request('GET', path, handler);
  }

  post(path: string, handler: Handler) {
    this._request('POST', path, handler);
  }
}
