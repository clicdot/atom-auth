'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  const { Schema, Model, AutoIncrement } = fastify.mgo;

  const RolesUser = new Schema({
    rtuId: Number,
    user: Object,
    role: Object
  },
  { collection: 'roles_to_user' });

  Model('RolesUser', RolesUser);
  RolesUser.plugin(AutoIncrement, { inc_field: 'rtuId' });
});
