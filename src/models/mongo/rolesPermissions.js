'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  const { Schema, Model, AutoIncrement } = fastify.mgo;

  const RolesPermissions = new Schema({
    rptId: Number,
    role: Object,
    permissions: Object
  },
  { collection: 'roles_to_permissions' });

  Model('RolesPermissions', RolesPermissions);
  RolesPermissions.plugin(AutoIncrement, { inc_field: 'rtpId' });
});
