'use strict';

const { test } = require('tap');
const { build, close } = require('../../../helper');

test('generate token', (assert) => {
  const app = build(assert);

  // assert.plan(3);

  assert.test('token route bad credentials', async (t) => {
    const res = await app.inject({
      method: 'POST',
      url: '/authenticate',
      payload: {
        username: 'peyton@automatize.com',
        password: 'test'
      }
    });

    const { response, data } = JSON.parse(res.payload);

    assert.equal(response.code, 401, 'Failed Auth');
    t.deepEqual(response.function, { method: 'POST', url: '/authenticate', ip: '127.0.0.1' }, 'Test function');
    t.notOk(data, 'Token value');
    t.ok(response.messages, 'Token messages');
    t.same(response.messages.errors[0], 'Authentication Error: No valid user found', 'Unauthorized Error');
    // close(app);
  });

  assert.test('token route good credentials - no companyId', async (t) => {
    const res = await app.inject({
      method: 'POST',
      url: '/authenticate',
      payload: {
        username: 'philip@automatize.com',
        password: '12345678'
      }
    });

    const { response } = JSON.parse(res.payload);

    assert.equal(response.code, 401, 'Failed Auth');
    t.deepEqual(response.function, { method: 'POST', url: '/authenticate', ip: '127.0.0.1' }, 'Test function');
    t.ok(response.messages, 'Token messages');
    t.same(response.messages.errors[0], 'Authentication Error: No valid companyId found', 'Unauthorized Error');
    // close(app);
  });

  assert.test('token route good credentials - /w companyId - md5', async (t) => {
    const res = await app.inject({
      method: 'POST',
      url: '/authenticate',
      payload: {
        username: 'alan@automatizelogistics.com',
        password: '12345678'
      }
    });

    const { response, data } = JSON.parse(res.payload);

    t.deepEqual(response.function, { method: 'POST', url: '/authenticate', ip: '127.0.0.1' }, 'Test function');
    t.notOk(response.messages, 'Token messages');
    t.ok(data, 'Token value');
    t.ok(data.accessToken, 'Access Token Issued');
    t.same(data.expires, 3600, 'Access Token Expires');
  });

  assert.test('token route good credentials - /w companyId - blowfish', async (t) => {
    const res = await app.inject({
      method: 'POST',
      url: '/authenticate',
      payload: {
        username: 'admin@automatizelogistics.com',
        password: '12345678'
      }
    });

    const { response, data } = JSON.parse(res.payload);

    t.deepEqual(response.function, { method: 'POST', url: '/authenticate', ip: '127.0.0.1' }, 'Test function');
    t.notOk(response.messages, 'Token messages');
    t.ok(data, 'Token value');
    t.ok(data.accessToken, 'Access Token Issued');
    t.same(data.expires, 3600, 'Access Token Expires');
    close(app);
    assert.end();
  });
});
