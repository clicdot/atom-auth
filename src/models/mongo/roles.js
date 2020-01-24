'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  const { Schema, Model, AutoIncrement } = fastify.mgo;

  const Roles = new Schema({
    rid: Number,
    role: String,
    description: String,
    company: Object
  });

  Model('Roles', Roles);
  Roles.plugin(AutoIncrement, { inc_field: 'rid' });
});
