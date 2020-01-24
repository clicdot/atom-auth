'use strict';

const responseSchema = require('../../schemas/response');
// const CHK = require('../../modules/ping');
const pkg = require('../../../package.json');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  })
    .addHook('preHandler', async (request, reply) => {
      // const chk = new CHK();
      const data = {
        BUILD: pkg.version
      };

      request.PING = data;
    });

  fastify.get('/ping', responseSchema('testData#'), async (request, reply) => {
    // request.log.error('Error 123: Something went wrong...');
    const { processor, mgo } = fastify;

    request.PING.DB = {
      username: processor.db.db.config.username.substr(0, 2) + '\u2026',
      password: processor.db.db.config.password !== undefined,
      host: processor.db.db.config.host,
      database: processor.db.db.config.database,
      ssl: processor.db.db.config.ssl !== undefined,
      connection: processor.db.db.connectionManager.pool._count > 0
    };

    request.PING.MONGO = {
      username: mgo.db.base.connections[0].user.substr(0, 2) + '\u2026',
      password: mgo.db.base.connections[0].pass !== undefined,
      host: mgo.db.base.connections[0].host,
      // database: mgo.db.base.connections[0].db,
      connection: mgo.db._readyState === 1
    };

    reply
      .send(request.PING);
  });
};
