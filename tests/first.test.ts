import request from 'supertest';
import assert from 'assert';
import net from 'node:net';
import http from 'node:http';

import { createWorkerServer } from '../src/server';
import { createDb } from '../src/userDb/db';
import exp from 'constants';

let temp_user;
let reques;
const user = { username: 'Petya', age: 25, hobbies: [] };
const user_update = { username: 'Vasya', age: 35, hobbies: ['tennis'] };

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
    temp_user = response.body;

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

  it('should update user and return an updated object with the same ID ', async () => {
    const reques = request(await createWorkerServer());
    const response = await reques.post('/api/users').send(user).expect('Content-Type', /json/).expect(201);
    const response_after_update = await reques
      .put(`/api/users/${response.body.id}`)
      .send(user_update)
      .expect('Content-Type', /json/)
      .expect(200);

    const { username, age, hobbies, id } = response_after_update.body;

    expect(username).toMatch(user_update.username);
    expect(age).toBe(user_update.age);
    expect(response.body.id).toBe(id);
    expect(hobbies.length).toBe(user_update.hobbies.length);
  });
});
