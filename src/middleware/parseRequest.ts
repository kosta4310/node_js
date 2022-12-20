import { createUser, getUsers } from '../controllers/controller';
import { Req, Res } from '../server';

function parseRequest(req: Req, res: Res) {
  if (req.method === 'GET' && req.url?.match(/^(\/api\/users)\/?$/)) {
    getUsers(req, res);
  } else if (req.method === 'POST' && req.url?.match(/^(\/api\/users)\/?$/)) {
    createUser(req, res);
  } else {
    res.writeHead(400, { 'Content-Type': 'text' });
    res.end('Not found');
  }
}

export function parseBody(req: Req, res: Res) {
  const body: Array<Buffer> = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    if (body) {
      req.body = JSON.parse(Buffer.concat(body).toString());
    }
    parseRequest(req, res);
  });
}
