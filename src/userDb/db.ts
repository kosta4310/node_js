import net from 'node:net';
import { User } from '../models/userModel';

export function createDb(): Promise<net.Server> {
  return new Promise((resolve, reject) => {
    const PORT = 8000;
    console.log('Db is running');

    let clientDB: Array<User> = [];
    const workersSockets: Array<net.Socket> = [];
    const server = net.createServer((socket) => {
      socket.on('data', (msg) => {
        const m = JSON.parse(msg.toString());
        console.log(m);
        clientDB = m;
        // console.log(clientDB);
        workersSockets.map((sock) => sock.write(JSON.stringify(clientDB)));
      });
    });
    server.on('connection', (socket) => workersSockets.push(socket));
    resolve(server);
    // server.listen(PORT, () => {
    //   console.log(`db is started on port ${PORT}`);
    //   resolve(server);
    // });
  });
}
