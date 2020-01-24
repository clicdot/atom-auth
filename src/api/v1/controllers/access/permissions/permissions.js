'use strict';

const responseSchema = require('../../../../../schemas/response');
const Error = require('../../../../../globals/throwError');
const C = require('../../../../../constants/constants');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  });

  fastify.get('/access/permissions/roles', responseSchema('testData#'), async (request, reply) => {
    try {
      const { Models } = fastify.mgo;
      const { RolesPermissions, Roles } = Models;
      const { profile } = request.user;

      // Get all rid's for a company plus 0, which is the default admin role
      const roles = await Roles.find({ 'company.companyId': { $in: [0, profile.companyId] } }, 'rid -_id');
      const rids = roles.map((item) => item.rid);

      RolesPermissions.find({ 'role.rid': { $in: rids } }, '-_id', (err, data) => {
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

  // fastify.post('/access/permissions/roles', responseSchema('testData#'), async (request, reply) => {
  //   try {
  //     const { Models } = fastify.mgo;
  //     const { RolesPermissions } = Models;
  //     // const { profile } = request.user;

  //     const check = await RolesPermissions.find({ 'user.uid': request.params.id }, '-_id');
  //     console.log(check);
  //     reply
  //       .send({hello: 'world'});
  //   } catch (err) {
  //     Error([err], C.CODE.NOT_ACCEPTABLE);
  //   }
  // });
};
