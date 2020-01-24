'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  const AutoIncrement = require('mongoose-sequence')(fastify.mongo.mongoose);
  fastify.mongo.mongoose.set('useFindAndModify', false);
  fastify.decorate('mgo', {
    db: fastify.mongo.db,
    Schema: fastify.mongo.db.base.Schema,
    Model: fastify.mongo.db.base.model,
    Models: fastify.mongo.db.models,
    AutoIncrement
  });
});
