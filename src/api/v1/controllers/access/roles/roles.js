'use strict';

const responseSchema = require('../../../../../schemas/response');
const Error = require('../../../../../globals/throwError');
const C = require('../../../../../constants/constants');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  });

  fastify.get('/access/roles', responseSchema('testData#'), async (request, reply) => {
    try {
      const { mgo } = fastify;
      const { Roles } = mgo.Models;
      const { profile } = request.user;

      Roles.find({ 'company.companyId': { $in: [0, profile.companyId] } }, 'rid role description company -_id', (err, data) => {
        if (err) {
          throw err;
        }
        reply
          .send(data);
      });
    } catch (err) {
      Error([
        err
      ], C.CODE.INTERNAL_SERVER_ERROR);
    }
  });

  fastify.post('/access/roles', responseSchema('testData#'), async (request, reply) => {
    try {
      const { mgo } = fastify;
      const { Roles } = mgo.Models;
      const { profile } = request.user;

      const check = await Roles.findOne({ role: request.body.role, 'company.companyId': profile.companyId }, '-_id');

      if (check) {
        throw C.MSG.DATA_ERROR_CREATE;
      }

      const { rid } = await Roles.findOne({}, 'rid -_id', {
        sort: {
          rid: -1
        }
      });

      const data = {
        rid: rid + 1,
        role: request.body.role.toLowerCase(),
        description: request.body.description ? request.body.description : '',
        company: {
          companyId: profile.companyId,
          companyType: profile.entity_type,
          companyTable: profile.entity_table_name
        }
      };

      const t = await Roles.create(data);

      reply
        .code(201)
        .send(t);
    } catch (err) {
      Error([
        err
      ], C.CODE.INTERNAL_SERVER_ERROR);
    }
  });

  fastify.patch('/access/roles/:rid', responseSchema('testData#'), async (request, reply) => {
    try {
      const { Models } = fastify.mgo;
      const { Roles } = Models;
      // const { profile, scope } = request.user;

      delete request.body.company;
      delete request.body.rid;
      if (request.body.role) {
        request.body.role = request.body.role.toLowerCase();
      }

      const update = await Roles.findOneAndUpdate({ rid: request.params.rid }, { $set: request.body }, { upsert: true });

      update.permission = request.body.permission;
      update.description = request.body.description;
      reply
        .send(update);
    } catch (err) {
      Error([err], C.CODE.NOT_ACCEPTABLE);
    }
  });
};
