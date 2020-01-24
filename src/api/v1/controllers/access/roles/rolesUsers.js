'use strict';

const responseSchema = require('../../../../../schemas/response');
const Error = require('../../../../../globals/throwError');
const UsersModel = require('../../../../../models/users');
const C = require('../../../../../constants/constants');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  });

  fastify.get('/access/roles/user/:id', responseSchema('testData#'), async (request, reply) => {
    try {
      const { mgo } = fastify;
      const { RolesUser } = mgo.Models;
      const { profile } = request.user;

      RolesUser.find({ 'user.companyId': { $in: [0, profile.companyId] }, 'user.uid': Number(request.params.id) }, '-_id', (err, data) => {
        if (err) {
          throw err;
        }
        console.log(data, profile.companyId, Number(request.params.id));
        reply
          .send(data);
      });
    } catch (err) {
      Error([
        err
      ], C.CODE.INTERNAL_SERVER_ERROR);
    }
  });

  fastify.get('/access/roles/users', responseSchema('testData#'), async (request, reply) => {
    try {
      const { mgo } = fastify;
      const { RolesUser } = mgo.Models;
      const { profile } = request.user;

      RolesUser.find({ 'user.companyId': { $in: [0, profile.companyId] } }, '-_id', (err, data) => {
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

  fastify.post('/access/roles/user/:uid', responseSchema('testData#'), async (request, reply) => {
    try {
      const { mgo } = fastify;
      const { RolesUser, Roles } = mgo.Models;
      const { profile } = request.user;
      const { db } = fastify;
      const Users = UsersModel(db);

      const check = await RolesUser.find({ 'user.companyId': { $in: [0, profile.companyId] }, 'user.uid': Number(request.params.uid) }, '-_id');

      if (check.length) {
        throw C.MSG.DATA_ERROR_CREATE;
      }

      if (!request.body.rid) {
        throw C.MSG.DATA_ERROR;
      } else {
        const checkRoles = await Roles.findOne({ rid: request.body.rid }, 'rid -_id');
        if (!checkRoles) {
          throw C.MSG.DATA_ERROR;
        }
      }

      const { rtuId } = await RolesUser.findOne({}, 'rtuId -_id', {
        sort: {
          rtuId: -1
        }
      });

      const u = await Users.findOne({
        raw: true,
        where: {
          id: request.params.uid,
          companyId: profile.companyId
        }
      });

      const data = {
        rtuId: rtuId + 1,
        user: {
          uid: u.id,
          companyId: u.companyId,
          entity_type: u.entity_type,
          entity_table_name: u.entity_table_name
        },
        role: request.body
      };

      const create = await RolesUser.create(data);
      reply
        .send(create);
    } catch (err) {
      Error([
        err
      ], C.CODE.INTERNAL_SERVER_ERROR);
    }
  });
};
