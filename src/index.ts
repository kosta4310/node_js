import { createDb } from './userDb/db';
import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import net from 'node:net';
import 'dotenv/config';
import { createWorkerServer } from './server';
import { User } from './models/userModel';

export const model: Array<User> = [
  { id: 'f45ec886-6837-483b-abba-9a8dd0a53aa5', username: 'Petya', age: 30, hobbies: [] },
];

const PORT = Number(process.env.PORT) || 4000;

console.log(`hello from master port ${PORT}`);

const [argument] = process.argv.slice(2);
if (argument && argument.slice(2) === 'cluster') {
  const numCores = os.cpus().length;

  if (cluster.isPrimary) {
    createDb();
    console.log(`Master pid: ${process.pid} port ${PORT}`);
    // console.log(`Starting ${cpus} forks`);

    const ports: Array<number> = [];

    let count = 0;

    for (let i = 0; i < numCores; i++) {
      cluster.fork({ workerPort: PORT + i + 1 });
      ports.push(PORT + i + 1);
    }

    const balancer = (socket: net.Socket) => {
      socket.on('data', (msg) => {
        const id = count % numCores;
        const port = ports[id];
        const serviceSocket = new net.Socket();

        serviceSocket.connect(port, '127.0.0.1', () => {
          serviceSocket.write(msg);
        });

        serviceSocket.on('data', (data) => {
          socket.write(data);
          console.log('end');
        });

        serviceSocket.on('close', (err) => {
          console.log(`close proxy ${serviceSocket.destroyed}`);
          socket.destroy();
          if (err) {
            console.log(`server error 500`);
          }
        });

        count++;
      });
      socket.on('close', (err) => {
        console.log(`close client ${socket.destroyed}`);
        if (err) {
          console.log(`server error 500`);
        }
      });
    };

    const server = net.createServer(balancer);
    server.listen(PORT);
  } else {
    console.log(`worker port ${process.env.workerPort}`);
    createWorkerServer(undefined);
  }
} else {
  createDb();
  console.log('not argument');
  createWorkerServer(PORT);
}
