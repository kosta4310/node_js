import http from 'node:http';

type Res = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};
type Req = http.IncomingMessage;

const users = 

export function createWorkerServer(port: number) {
  const server = http.createServer((req: Req, res: Res) => {
    res.end('ales gut');
  });

  server.listen(port, () => {
    console.log(`Server runnig on port ${port}`);
  });
}
