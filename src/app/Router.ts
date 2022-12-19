import http from 'node:http';

type Handler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  request(method = 'GET', path: string, handler: Handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];

    endpoint[method] = handler;
  }

  get(path: string, handler: Handler) {
    this.request('GET', path, handler);
  }

  post(path: string, handler: Handler) {
    this.request('POST', path, handler);
  }

  put(path: string, handler: Handler) {
    this.request('PUT', path, handler);
  }

  delete(path: string, handler: Handler) {
    this.request('DELETE', path, handler);
  }
}
