'use strict';

const responseSchema = require('../../../../../schemas/response');
const UsersModel = require('../../../../../models/users');
const C = require('../../../../../constants/constants');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  });

  fastify.get('/access/user/:id', responseSchema('testData#'), async (request, reply) => {
    const { profile } = request.user;
    const { db } = fastify;
    const Users = UsersModel(db);

    const u = await Users.findAll({
      raw: true,
      where: {
        id: request.params.id,
        companyId: profile.companyId
      }
    });

    if (u && u.length) {
      const users = u.map((item) => {
        delete item.password;
        return item;
      });
      reply.send(users);
    } else {
      reply.send({
        errors: [C.MSG.DATA_ERROR],
        code: C.CODE.NOT_ACCEPTABLE
      });
    }
  });

  fastify.get('/access/users', responseSchema('testData#'), async (request, reply) => {
    const { profile } = request.user;
    const { db } = fastify;
    const Users = UsersModel(db);

    const u = await Users.findAll({
      raw: true,
      where: {
        companyId: profile.companyId
      }
    });

    if (u && u.length) {
      const users = u.map((item) => {
        delete item.password;
        return item;
      });
      reply.send(users);
    } else {
      reply.send({
        errors: [C.MSG.DATA_ERROR],
        code: C.CODE.NOT_ACCEPTABLE
      });
    }
  });

  // fastify.post('/access/users', responseSchema('testData#'), async (request, reply) => {
  //   // const { profile } = request.user;
  //   // const { db } = fastify;
  //   // const Users = UsersModel(db);
  // });

  // fastify.post('/access/users/roles', responseSchema('testData#'), async (request, reply) => {
  //   // const { profile } = request.user;
  //   // const { db } = fastify;
  //   // const Users = UsersModel(db);
  // });
};
