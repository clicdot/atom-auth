'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  const { Schema, Model, AutoIncrement } = fastify.mgo;

  const Permissions = new Schema({
    pid: Number,
    permission: String,
    description: String
  });

  Model('Permissions', Permissions);
  Permissions.plugin(AutoIncrement, { inc_field: 'pid' });
});
