import http from 'node:http';
import path from 'node:path';
import 'dotenv/config';

import { createReadStream } from 'node:fs';

const reg = /^(\/api\/users)\/?$/g;

console.log('hello from master');
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url?.match(reg)) {
    const stream = createReadStream(path.resolve(__dirname, './data/model.txt'));
    stream.pipe(res);
    console.log('success');
  } else {
    console.log('not found');
    res.end('not found');
  }

  // res.end('hello from server');
});
server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
