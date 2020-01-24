'use strict';

const { test } = require('tap');
const { build } = require('../../../helper');

test('ping', async (assert) => {
  const app = build(assert);

  const res = await app.inject({
    method: 'GET',
    url: '/ping'
  });

  const { response, data } = JSON.parse(res.payload);

  assert.deepEqual(response.function, { method: 'GET', url: '/ping', ip: '127.0.0.1' }, 'Test function');
  assert.ok(data, 'Ping');
  assert.end();
});
