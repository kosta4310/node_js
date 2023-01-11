import http from 'node:http';

import { parseBody } from './middleware/parseRequest';

export type Res = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Req = http.IncomingMessage & Record<string, any>;

export function createWorkerServer(): Promise<http.Server> {
  return new Promise((resolve) => {
    const server = http.createServer((req: Req, res: Res) => {
      process.env.workerPort && console.log(`Worker port ${process.env.workerPort} accepted the request`);
      parseBody(req, res);
    });

    resolve(server);
  });
}
