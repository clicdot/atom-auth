'use strict';

const { test } = require('tap');
const { build } = require('./swaggerhelper');
const build2 = require('./helper').build;
const cheerio = require('cheerio');

test('Swagger', (assert) => {
  const app = build(assert);

  assert.plan(2);

  assert.test('swagger route', async (assert) => {
    const res = await app.inject({
      method: 'GET',
      url: '/swagger-ui/'
    });

    const $ = cheerio.load(res.payload);

    assert.same($('title').text(), 'Swagger UI', 'Title');
    // assert.end();
  });

  assert.test('swagger specification route', async (assert) => {
    const app = build2(assert);

    const res = await app.inject({
      method: 'GET',
      url: '/swagger-ui/specification.json'
    });

    const data = JSON.parse(res.payload);

    assert.ok(data.swagger, 'response Exist');
    assert.ok(data, 'data Exist');
    assert.ok(data.swagger, 'swagger Exist');
    assert.equal(data.swagger, '2.0', 'swagger version');
    // assert.end();
  });
});
