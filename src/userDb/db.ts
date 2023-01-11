import net from 'node:net';
import { User } from '../models/userModel';

export function createDb(): Promise<net.Server> {
  return new Promise((resolve) => {
    let clientDB: Array<User> = [];
    const workersSockets: Array<net.Socket> = [];
    const server = net.createServer((socket) => {
      socket.on('data', (msg) => {
        const m = JSON.parse(msg.toString());
        clientDB = m;
        workersSockets.map((sock) => sock.write(JSON.stringify(clientDB)));
      });
    });
    server.on('connection', (socket) => workersSockets.push(socket));
    resolve(server);
  });
}
