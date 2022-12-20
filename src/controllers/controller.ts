import { createNewUser, getAllUsers } from '../models/userModel';
import { Req, Res } from '../server';

export function getUsers(req: Req, res: Res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(getAllUsers()));
}

export function createUser(req: Req, res: Res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  res.end(JSON.stringify(createNewUser(req.body)));
}
