import request from 'supertest';
import assert from 'assert';
import net from 'node:net';
import http from 'node:http';
import { testServer } from '../src/testServer';

import { createWorkerServer } from '../src/server';
import { createDb } from '../src/userDb/db';
import exp from 'constants';

// async function run() {

describe('name', () => {
  // createDb().then((db) =>
  //   createWorkerServer(4000).then((app) => {
  //     afterAll(() => {
  //       (app as http.Server).close();
  //       (db as net.Server).close();
  //     });
  //   }),
  // );
  // const app = await createWorkerServer(4000);
  // afterAll(() => {
  //   (app as http.Server).close();
  //   (db as net.Server).close();
  // });
  test('adds 1 + 2 to equal 3', async () => {
    // http.request({ host: '127.0.0.1', port: 4000 }, (res) => console.log(res.statusCode));
    await request(await createWorkerServer())
      .get('/api/userss')
      .expect('Content-Type', /json/)
      .expect(600);
  });
});
