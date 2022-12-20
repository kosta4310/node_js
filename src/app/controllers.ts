import { Req, Res } from './App';

type User = {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};
const users: Array<User> = [];

export function getUsers(req: Req, res: Res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

export function createPost(req: Req, res: Res) {
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  if (req.body) {
    users.push(req.body);
  } else {
    res.end('error');
  }
  res.send(req.body);
}
