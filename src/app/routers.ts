import { Router } from './Router';
import { users } from '../data/model';
import http from 'node:http';

export const router = new Router();

router.get('/api/users', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
});

router.post('/api/users', (req, res) => {
  console.log(req.body);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  users.push(req.body);
  res.end(JSON.stringify(req.body));
});

router.put('/api/users', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
});

router.delete('/api/users', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
});
