import { createDb } from './userDb/db';
import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import net from 'node:net';
import 'dotenv/config';
import { createWorkerServer } from './server';
import { User } from './models/userModel';
import { dbsocket } from './models/userModel';

export const model: Array<User> = [
  { id: 'f45ec886-6837-483b-abba-9a8dd0a53aa5', username: 'Petya', age: 30, hobbies: [] },
];

const PORT = Number(process.env.PORT) || 4000;
const DB_PORT = Number(process.env.DB_PORT) || 8000;

console.log(`hello from master port ${PORT}`);
async function startApp() {
  const [argument] = process.argv.slice(2);
  if (argument && argument.slice(2) === 'cluster') {
    const numCores = os.cpus().length;

    if (cluster.isPrimary) {
      const db_server = await createDb();
      db_server.listen(DB_PORT, () => console.log(`db is started on port ${DB_PORT}`));
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
      const port = Number(process.env.workerPort);
      const server = await createWorkerServer();
      server.listen(port, () => console.log(`worker port ${process.env.workerPort}`));
      // dbsocket.connect(DB_PORT, '127.0.0.1', () => {
      //   console.log(`connect to db pid ${process.pid}`);
      // });
    }
  } else {
    const db_server = await createDb();
    db_server.listen(DB_PORT, () => console.log(`db is started on port ${DB_PORT}`));
    console.log(`dbport: ${process.env.DB_PORT}`);
    const appServer = await createWorkerServer();
    appServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

startApp();
