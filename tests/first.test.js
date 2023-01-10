import request from 'supertest';
import assert from 'assert';
import net from 'node:net';
import http from 'node:http';

import { createWorkerServer } from '../src/server';
import { createDb } from '../src/userDb/db';
import exp from 'constants';

// async function run() {

describe('Getting, creating, updating and deleting user and checking consistency of its data', () => {
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
  it('should return empty array', async () => {
    await request(await createWorkerServer())
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (err, res) {
        if (err) {
          throw err;
        }
        console.log(res);
      });
  });
});
