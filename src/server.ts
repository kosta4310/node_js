import http from 'node:http';
import { parseBody } from './middleware/parseRequest';

export type Res = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

export type Req = http.IncomingMessage & Record<string, any>;

export function createWorkerServer(port: number) {
  const server = http.createServer((req: Req, res: Res) => {
    parseBody(req, res);
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
