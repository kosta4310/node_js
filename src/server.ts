import http from 'node:http';
import { resolve } from 'node:path';

import { parseBody } from './middleware/parseRequest';
import { User } from './models/userModel';

export type Res = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Req = http.IncomingMessage & Record<string, any>;

export function createWorkerServer(): Promise<http.Server> {
  return new Promise((resolve, reject) => {
    // port = port || Number(process.env.workerPort);
    // const port = Number(process.env.workerPort) | 4000;

    const server = http.createServer((req: Req, res: Res) => {
      process.env.workerPort && console.log(`worker hello from port ${process.env.workerPort}`);

      parseBody(req, res);
    });

    // server.listen(port, () => {
    //   console.log(`Server running on port ${port}`);
    //   resolve(server);
    // });
    resolve(server);
  });
}
