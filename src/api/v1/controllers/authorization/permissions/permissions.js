'use strict';

const responseSchema = require('../../../../../schemas/response');
const Error = require('../../../../../globals/throwError');
const C = require('../../../../../constants/constants');
// const caniuse = require('../../../../globals/canIUse');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  });

  fastify.get('/authorization/permissions', responseSchema('testData#'), async (request, reply) => {
    try {
      const { Models } = fastify.mgo;
      const { Permissions } = Models;
      // const { profile, scope } = request.user;
      // console.log(profile, scope);
      // const roles = await Roles.find({'company.companyId': { $in: [0, profile.companyId] } }, 'rid -_id');
      // const rids = roles.map((item) => item.rid);

      Permissions.find({}, '-_id -__v', (err, data) => {
        if (err || !data.length) {
          reply
            .send({ errors: ['Data not found'], code: 406 });
        }
        reply
          .send(data);
      });
    } catch (err) {
      Error([err], C.CODE.NOT_ACCEPTABLE);
    }
  });

  fastify.post('/authorization/permissions', responseSchema('permissionCreateData#'), async (request, reply) => {
    try {
      const { Models } = fastify.mgo;
      const { Permissions } = Models;
      // const { profile, scope } = request.user;

      const check = await Permissions.findOne({ permission: request.body.permission }, 'permission -_id');

      if (check) {
        throw C.MSG.DATA_ERROR_CREATE;
      }

      const { pid } = await Permissions.findOne({}, 'pid -_id', {
        sort: {
          pid: -1
        }
      });

      const t = await Permissions.create({ pid: (pid + 1), permission: request.body.permission, description: request.body.description });

      reply
        .code(201)
        .send(t);
    } catch (err) {
      Error([err], C.CODE.NOT_ACCEPTABLE);
    }
  });

  fastify.put('/authorization/permissions/:pid', responseSchema('testData#'), async (request, reply) => {
    try {
      const { Models } = fastify.mgo;
      const { Permissions } = Models;
      // const { profile, scope } = request.user;

      const update = await Permissions.findOneAndUpdate({ pid: request.params.pid }, {
        pid: request.params.pid,
        permission: request.body.permission,
        description: request.body.description
      }, { upsert: true });

      update.permission = request.body.permission;
      update.description = request.body.description;
      reply
        .send(update);
    } catch (err) {
      Error([err], C.CODE.NOT_ACCEPTABLE);
    }
  });

  fastify.patch('/authorization/permissions/:pid', responseSchema('testData#'), async (request, reply) => {
    try {
      const { Models } = fastify.mgo;
      const { Permissions } = Models;
      // const { profile, scope } = request.user;

      const update = await Permissions.findOneAndUpdate({ pid: request.params.pid }, { $set: request.body }, { upsert: true });

      update.permission = request.body.permission;
      update.description = request.body.description;
      reply
        .send(update);
    } catch (err) {
      Error([err], C.CODE.NOT_ACCEPTABLE);
    }
  });

  fastify.delete('/authorization/permissions/:pid', responseSchema('testData#'), async (request, reply) => {
    try {
      const { Models } = fastify.mgo;
      const { Permissions } = Models;
      // const { profile, scope } = request.user;

      const update = await Permissions.findOneAndUpdate({ pid: request.params.pid }, {
        pid: request.params.pid,
        permission: request.body.permission,
        description: request.body.description
      }, { upsert: true });

      update.permission = request.body.permission;
      update.description = request.body.description;
      reply
        .send(update);
    } catch (err) {
      Error([err], C.CODE.NOT_ACCEPTABLE);
    }
  });
};
