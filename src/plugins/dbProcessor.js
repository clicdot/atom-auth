'use strict';

const fp = require('fastify-plugin');
const DB = require('../modules/dbProcessor');

module.exports = fp(async (fastify, opts) => {
  const db = new DB(fastify.db);

  fastify.decorate('processor', {
    db: db,
    conn: db.connection()
  });
});
