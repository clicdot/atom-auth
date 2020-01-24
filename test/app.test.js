'use strict';

const { test } = require('tap');
const { build, close } = require('./helper');
// const cheerio = require('cheerio');
const fastifySequelize = require('../src/modules/sequelize');
const Sequelize = require('sequelize');
const Fastify = require('fastify');

// const db = require('../src/plugins/dbconnector');

const R = require('../src/helpers/response');
const uuidv4 = require('uuid/v4');

test('App Test', (assert) => {
  const app = build(assert);

  assert.plan(3);

  assert.test('Catch All GET /', async (assert) => {
    const root = await app.inject({
      method: 'GET',
      url: '/',
      headers: {
        'Content-type': 'application/json'
      }
    });

    const { response } = JSON.parse(root.payload);

    assert.equal(response.code, 404);
    assert.same(root.headers['content-type'], 'application/json; charset=utf-8', 'Match content-type header');
    assert.same(response.messages.errors[0], 'not found', 'Retrieve response error message');
    close(app);
    assert.end();
  });

  assert.test('Sequelize', async (t) => {
    t.plan(4);

    t.test('fastify.sequelize should exist', t => {
      t.plan(2);

      const fastify = Fastify();

      fastify.register(fastifySequelize, {
        // autoConnect: false,
        dialect: 'mysql',
        host: 'localhost',
        database: 'test',
        username: 'root',
        password: 'root'
      });

      fastify.ready(err => {
        t.error(err);
        t.ok(fastify.sequelize);

        fastify.sequelize.close();
        fastify.close();
      });
    });

    t.test('Sequelize instance name should work', t => {
      t.plan(2);

      const fastify = Fastify();

      fastify.register(fastifySequelize, {
        instance: 'db', // instance name
        // autoConnect: true,
        dialect: 'mysql',
        host: 'localhost',
        database: 'test',
        username: 'root',
        password: 'root'
      });

      fastify.ready(err => {
        t.error(err);
        t.ok(fastify.db, 'instance name');

        fastify.db.close();
        fastify.close();
      });
    });

    t.test('Sequelize should work fine with records', t => {
      t.plan(3);

      const fastify = Fastify();

      fastify.register(fastifySequelize, {
        // autoConnect: true,
        autoConnect: false,
        dialect: 'mysql',
        host: 'localhost',
        database: 'test',
        username: 'root',
        password: 'root'
      });

      fastify.ready(err => {
        t.error(err);
        t.ok(fastify.sequelize);

        const User = fastify.sequelize.define('user', {
          name: Sequelize.STRING
        });

        User.sync({ force: true }).then(() => {
          User.create({ name: 'Iron Man' })
            .then(user => {
              t.ok(user);
              fastify.close();
            })
            .catch(err => {
              t.error(err);
              fastify.close();
            });
        })
          .catch(err => {
            t.error(err);
            fastify.close();
          });
      });
    });

    t.test('Sequelize should close connection before Fastify closed', t => {
      t.plan(2);

      const fastify = Fastify();

      fastify.register(fastifySequelize, {
        autoConnect: true,
        dialect: 'mysql',
        host: 'localhost',
        database: 'test',
        username: 'root',
        password: 'root'
      });

      fastify.ready(err => {
        t.error(err);

        fastify.close(() => {
          fastify
            .sequelize
            .authenticate()
            .then(() => {
              t.error('connection not closed !');
            })
            .catch(err => {
              t.ok(err);
            });
        });
      });
    });
    assert.end();
  });

  // assert.test('GET /swagger-ui/', async (assert) => {
  //   const swagger = await app.inject({
  //     method: 'GET',
  //     url: '/swagger-ui/',
  //     headers: {
  //       'Content-type': 'text/html'
  //     }
  //   });

  //   const $ = cheerio.load(swagger.payload);

  //   assert.same($('title').text(), 'Swagger UI', 'Title');
  //   // assert.end();
  // });

  assert.test('Response Handler', async (assert) => {
    const res = new R();

    const ts = new Date();
    const uuid = uuidv4();

    const req = {
      raw: {
        method: 'GET',
        url: '/',
        ip: '127.0.0.1'
      },
      hostname: 'localhost',
      appVersion: 'v1'
    };

    const rep = {
      statusCode: 200
    };

    const set = {
      response: {
        code: null,
        id: null,
        timestamp: null,
        function: {},
        messages: {
          errors: [],
          warnings: [],
          infos: [
            'hello world'
          ]
        },
        test: []
      },
      data: []
    };

    res.$init(req, rep);

    res.$inject('timestamp', ts);
    res.$inject('id', uuid);
    res.$data(1);

    const response = res.$send();
    res.__deleteNulls(set);

    assert.equal(response.data, 1);
    assert.equal(response.response.code, 200, 'code');
    // assert.same(response.response.timestamp, ts, 'Timestamp');
    assert.ok(response.response.function.apiVersion, 'API Version');
    assert.equal(response.response.id, uuid);
    // assert.end();
  });
});
