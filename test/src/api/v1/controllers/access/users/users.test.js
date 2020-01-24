'use strict';

const { test } = require('tap');
const { build, close } = require('../../../../../../helper');
const jwt = require('../../../../../../jwt.json').jwt;

test('Users test', (assert) => {
  const app = build(assert);

  assert.plan(2);

  assert.test('GET - User /w ID', async (t) => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/access/user/13',
      headers: { Authorization: 'Bearer ' + jwt }
    });

    const { response, data } = JSON.parse(res.payload);

    t.equal(response.code, 200, 'Success');
    t.deepEqual(response.function, { method: 'GET', url: '/api/v1/access/user/13', ip: '127.0.0.1', apiVersion: 'v1' }, 'Test function');
    t.notOk(response.messages, 'Errors do not exist');
    t.ok(data, 'Permissions Data');
  });

  assert.test('GET - Users', async (t) => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/access/users',
      headers: { Authorization: 'Bearer ' + jwt }
    });

    const { response, data } = JSON.parse(res.payload);

    t.equal(response.code, 200, 'Success');
    t.deepEqual(response.function, { method: 'GET', url: '/api/v1/access/users', ip: '127.0.0.1', apiVersion: 'v1' }, 'Test function');
    t.notOk(response.messages, 'Errors do not exist');
    t.ok(data, 'Permissions Data');
    close(app);
    t.end();
  });
});
