import request from 'supertest';
import assert from 'assert';
import net from 'node:net';
import http from 'node:http';

import { createWorkerServer } from '../src/server';
import { createDb } from '../src/userDb/db';
import exp from 'constants';

const user = { username: 'Petya', age: 25, hobbies: [] };

describe('Getting, creating, updating and deleting user and checking consistency of its data', () => {
  it('should return empty array', async () => {
    const reques = request(await createWorkerServer());
    const response = await reques.get('/api/users').expect('Content-Type', /json/).expect(200);
    expect(response.body.length).toBe(0);
  });

  it('should return newly created record', async () => {
    const reques = request(await createWorkerServer());

    const response = await reques.post('/api/users').send(user).expect('Content-Type', /json/).expect(201);

    const { username, age, hobbies } = response.body;

    expect(username).toMatch(user.username);
    expect(age).toBe(user.age);
    expect(hobbies.length).toBe(user.hobbies.length);
  });

  it('should return created record by ID', async () => {
    const reques = request(await createWorkerServer());
    const response = await reques.post('/api/users').send(user).expect('Content-Type', /json/).expect(201);

    const res = await reques.get(`/api/users/${response.body.id}`).expect('Content-Type', /json/).expect(200);

    const { username, age, hobbies } = res.body;

    expect(username).toMatch(user.username);
    expect(age).toBe(user.age);
    expect(hobbies.length).toBe(user.hobbies.length);
  });
});
