import { createUser, getUsers } from '../controllers/controller';
import { MyError } from '../errors/MyError';
import { httpStatusCodes } from '../httpStatusCodes';
import { Req, Res } from '../server';

async function parseRequest(req: Req, res: Res) {
  try {
    if (req.method === 'GET' && req.url?.match(/^(\/api\/users)\/?$/)) {
      await getUsers(req, res);
    } else if (req.method === 'POST' && req.url?.match(/^(\/api\/users)\/?$/)) {
      await createUser(req, res);
    } else {
      res.writeHead(httpStatusCodes.BAD_REQUEST, { 'Content-Type': 'text' });
      res.end('Not found');
    }
  } catch (error) {
    if (error instanceof MyError) {
      res.writeHead(error.statusCode, { 'Content-Type': 'text' });
      res.end(error.message);
    } else res.end('oops!'); /**нужно добавить статус ошибки */
  }
}

export function parseBody(req: Req, res: Res) {
  const body: Array<Buffer> = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    if (body.length) {
      req.body = JSON.parse(Buffer.concat(body).toString());
    }
    parseRequest(req, res);
  });
}
