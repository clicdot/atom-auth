'use strict';

// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../src/app');
require('../src/environment/env');

const { beforeEach, afterEach, tearDown } = require('tap');

let app;

beforeEach(async (done) => {
  app = Fastify({ logger: { level: 'silent' } });
  app.register(require('../src/adapter/dbconnect'));
  done();
});

afterEach(async (done) => {
  done();
});

tearDown(async () => {

});

// Fill in this config with all the configurations
// needed for testing the application
function config () {
  return {

  };
}

// automatically build and tear down our instance
function build (t) {
  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(fp(App), config());

  t.beforeEach((done) => {
    done();
  });

  t.afterEach((done) => {
    done();
  });

  // tear down our app after we are done
  t.tearDown(() => {
    app.close();
    app.close.bind(app);
  });

  return app;
}

function close (app) {
  // Quit Redis
  if (app.redis) {
    app.redis.quit();
  }
  // Close Sequelize
  if (app.db) {
    app.db.close();
  }
  // Close Mongo
  if (app.mongo) {
    app.mongo.db.close();
  }
  // Close Mongo
  // if (app.mgo) {
  //   app.mgo.db.close();
  // }
  // Close ElasticSearch
  if (app.elastic) {
    app.elastic.close();
  }
  // Close MySQL
  if (app.mysql) {
    app.mysql.pool.end();
  }
}

module.exports = { build, close };
