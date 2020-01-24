'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  // console.log(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`);
  fastify
  // `fastify-mongodb` makes this connection and store the database instance into `fastify.mongo.db`
  // See https://github.com/fastify/fastify-mongodb
  // .register(require('fastify-mongodb'), { url: process.env.MONGODB_URL, useNewUrlParser: true })
  // See https://github.com/fastify/fastify-mongoose
    .register(require('../modules/mongoose'), { uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_DB}?authSource=admin` })
  // `fastify-elasticsearch` makes this connection and store the database instance into `fastify.elastic`
  // See https://github.com/fastify/fastify-elasticsearch
  // .register(require('fastify-elasticsearch'), { host: process.env.ELAST_HOST, port: process.env.ELAST_PORT })
  // `fastify-redis` makes this connection and store the database instance into `fastify.redis`
  // See https://github.com/fastify/fastify-redis
  // .register(require('fastify-redis'), { host: process.env.REDIS_HOST })
  // .register(require('fastify-mysql'), {
  //   promise: true,
  //   connectionString: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
  //   connectionLimit: 5
  // });
    .register(require('../modules/sequelize'), {
      instance: 'db', // the name of fastify plugin instance.
      // autoConnect: true,
      dialect: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectionURL: `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
    });
});
