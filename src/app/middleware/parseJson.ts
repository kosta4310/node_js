import http from 'node:http';

export function parseJson(
  req: http.IncomingMessage & Record<string, any>,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  } & Record<string, any>,
) {
  res.send = (data: any) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };
}
