import request from 'supertest';
import { createWorkerServer } from '../src/server';
import { User } from '../src/models/userModel';

let user_temp: User;
let reques: request.SuperTest<request.Test>;
const user: Omit<User, 'id'> = { username: 'Petya', age: 25, hobbies: [] };
const user_update: Omit<User, 'id'> = { username: 'Vasya', age: 35, hobbies: ['tennis'] };

describe('Getting, creating, updating and deleting user with a correct data and checking the returning value', () => {
  it('should return empty array', async () => {
    const reques = request(await createWorkerServer());
    const response = await reques.get('/api/users').expect('Content-Type', /json/).expect(200);
    expect(response.body.length).toBe(0);
  });

  it('should return newly created record', async () => {
    reques = request(await createWorkerServer());

    const response = await reques.post('/api/users').send(user).expect('Content-Type', /json/).expect(201);

    const { username, age, hobbies } = response.body;
    user_temp = response.body;

    expect(username).toMatch(user.username);
    expect(age).toBe(user.age);
    expect(hobbies.length).toBe(user.hobbies.length);
  });

  it('should return created record by ID', async () => {
    const res = await reques.get(`/api/users/${user_temp.id}`).expect('Content-Type', /json/).expect(200);

    const { username, age, hobbies } = res.body;

    expect(username).toMatch(user_temp.username);
    expect(age).toBe(user_temp.age);
    expect(hobbies.length).toBe(user_temp.hobbies.length);
  });

  it('should update user and return an updated object with the same ID ', async () => {
    const response_after_update = await reques
      .put(`/api/users/${user_temp.id}`)
      .send(user_update)
      .expect('Content-Type', /json/)
      .expect(200);

    const { username, age, hobbies, id } = response_after_update.body;

    expect(username).toMatch(user_update.username);
    expect(age).toBe(user_update.age);
    expect(user_temp.id).toBe(id);
    expect(hobbies.length).toBe(user_update.hobbies.length);
    user_temp = response_after_update.body;
  });

  it('should return confirmation of successful deletion', async () => {
    await reques.delete(`/api/users/${user_temp.id}`).expect('Content-Type', /json/).expect(204);
  });

  it('should return answer that there is no such object)', async () => {
    await reques.get(`/api/users/${user_temp.id}`).expect('Content-Type', /text/).expect(404);
  });
});

describe('Validation of user object data', () => {
  it('The username must be a string, otherwise a 400 error will be thrown.', async () => {
    const incorect_name = Object.assign(JSON.parse(JSON.stringify(user)), { username: 5 });
    await reques.post('/api/users').send(incorect_name).expect('Content-Type', /text/).expect(400);
  });

  it('The age must be a number, otherwise a 400 error will be thrown.', async () => {
    const incorect_name = Object.assign(JSON.parse(JSON.stringify(user)), { age: '5' });
    await reques.post('/api/users').send(incorect_name).expect('Content-Type', /text/).expect(400);
  });

  it('The age must be a number >= 0, otherwise a 400 error will be thrown.', async () => {
    const incorect_name = Object.assign(JSON.parse(JSON.stringify(user)), { age: -5 });
    await reques.post('/api/users').send(incorect_name).expect('Content-Type', /text/).expect(400);
  });

  it('The hobbies must be an array otherwise a 400 error will be thrown.', async () => {
    const incorect_name = Object.assign(JSON.parse(JSON.stringify(user)), { age: 'array' });
    await reques.post('/api/users').send(incorect_name).expect('Content-Type', /text/).expect(400);
  });

  it('The age must be an array of string, otherwise a 400 error will be thrown.', async () => {
    const incorect_name = Object.assign(JSON.parse(JSON.stringify(user)), { age: [4, 5] });
    await reques.post('/api/users').send(incorect_name).expect('Content-Type', /text/).expect(400);
  });

  it('The user object should contain username, age, hobbies only, otherwise a 400 error will be thrown.', async () => {
    const incorect_name = Object.assign(JSON.parse(JSON.stringify(user)), { something: 'something' });
    await reques.post('/api/users').send(incorect_name).expect('Content-Type', /text/).expect(400);
  });
});
