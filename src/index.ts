import http from 'node:http';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
import path from 'node:path';
import 'dotenv/config';
import { createWorkerServer } from './server';

export const model = [
  {
    username: 'Petya',
    age: 30,
    hobbies: [],
  },
];

const PORT = Number(process.env.PORT) || 4000;

console.log('hello from master');

const [argument] = process.argv.slice(2);
if (argument && argument.slice(2) === 'cluster') {
  const numCores = cpus().length;

  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running on port ${PORT}`);
    const server = http.createServer((req, res) => {
      console.log(req.url);
    });
    server.listen(PORT, () => console.log('primary server is running'));
    // Fork workers.
    for (let i = 0; i < numCores; i++) {
      cluster.fork({ workerPort: PORT + i + 1 });
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    console.log(`worker port ${process.env.workerPort}`);
    createWorkerServer(PORT);
    // process.env.workerPort && createWorkerServer(Number(process.env.workerPort));
  }
} else {
  console.log('not argument');
  createWorkerServer(PORT);
}
