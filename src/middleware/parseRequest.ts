import { MyError } from '../errors/MyError';
import { httpStatusCodes } from '../httpStatusCodes';
import { routes } from '../constants/routes';
import { endpoints } from '../constants/endpoints';
import { Req, Res } from '../server';

async function parseRequest(req: Req, res: Res) {
  try {
    for (const method in endpoints) {
      if (Object.hasOwnProperty.call(endpoints, method)) {
        if (method === req.method) {
          const endpoint = endpoints[method];
          for (const route in endpoint) {
            if (Object.hasOwnProperty.call(endpoint, route)) {
              if (req.url?.match(routes[route])) {
                const callback = endpoints[method][route];
                await callback(req, res);
                return;
              }
            }
          }
          res.writeHead(httpStatusCodes.NOT_FOUND, { 'Content-Type': 'text' });
          res.end('The server cannot find the requested resource.');
        }
      }
    }
  } catch (error) {
    if (error instanceof MyError) {
      res.writeHead(error.statusCode, { 'Content-Type': 'text' });
      res.end(error.message);
    } else {
      res.writeHead(httpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'text' });
      res.end('Something wrong. Try again later, please.');
    }
  }
}

export function parseBody(req: Req, res: Res) {
  const body: Array<Buffer> = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', async () => {
    try {
      if (body.length) {
        req.body = JSON.parse(Buffer.concat(body).toString());
      }
      await parseRequest(req, res);
    } catch (error) {
      if (error) {
        res.writeHead(httpStatusCodes.BAD_REQUEST, { 'Content-Type': 'text' });
        res.end('Invalid input');
      }
    }
  });
}
