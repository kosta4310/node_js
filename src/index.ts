import { createDb } from './userDb/db';
import http from 'node:http';
import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import 'dotenv/config';
import { createWorkerServer } from './server';
import { User } from './models/userModel';
import { dbsocket } from './models/userModel';

export const model: Array<User> = [
  { id: 'f45ec886-6837-483b-abba-9a8dd0a53aa5', username: 'Petya', age: 30, hobbies: [] },
];

const PORT = Number(process.env.PORT) || 4000;
const DB_PORT = Number(process.env.DB_PORT) || 8000;

async function startApp() {
  const [argument] = process.argv.slice(2);
  if (argument && argument.slice(2) === 'cluster') {
    const numCores = os.cpus().length;

    if (cluster.isPrimary) {
      const db_server = await createDb();
      db_server.listen(DB_PORT, () => console.log(`Database is started on port ${DB_PORT}`));
      console.log(`Master pid ${process.pid} is started on port ${PORT} and will start ${numCores} workers`);

      const ports: Array<number> = [];

      let count = 0;

      for (let i = 0; i < numCores; i++) {
        cluster.fork({ workerPort: PORT + i + 1 });
        ports.push(PORT + i + 1);
      }

      const balancer = (req: http.IncomingMessage, res: http.OutgoingMessage) => {
        const id = count % numCores;
        count++;
        const port = ports[id];

        const options = {
          hostname: 'localhost',
          port: port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        const request = http.request(options, (response) => {
          const data: Array<Buffer> = [];
          response.on('data', (chunk) => {
            data.push(chunk);
          });

          response.on('end', () => {
            res.setHeader(
              'Content-Type',
              response.headers['content-type'] ? response.headers['content-type'] : 'text/plain',
            );
            res.write(data.join().toString());
            res.end();
          });
        });
        const data: Array<Buffer> = [];
        req.on('data', (chunk: Buffer) => {
          data.push(chunk);
        });

        req.on('end', () => {
          request.write(data.join().toString());
          request.end();
        });
      };

      const server = http.createServer(balancer);
      server.listen(PORT);
    } else {
      process.env.modeClusterForWorkers = 'true';
      const port = Number(process.env.workerPort);
      const server = await createWorkerServer();
      server.listen(port, () => console.log(`Worker pid ${process.pid} is started on port ${process.env.workerPort}`));
      dbsocket.connect(DB_PORT, '127.0.0.1', () => {
        console.log(`Worker pid ${process.pid} connected to database`);
      });
    }
  } else {
    const appServer = await createWorkerServer();
    appServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

startApp();
