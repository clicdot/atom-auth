'use strict';

const responseSchema = require('../../schemas/response');
const Claims = require('../../modules/claimsBuilder');
const UsersModel = require('../../models/users');
const compareCrypt = require('../../helpers/compare-crypt');
const C = require('../../constants/constants');
// const bcrypt = require('twin-bcrypt');
// const md5 = require('md5');
module.exports = async (fastify, opts) => {
  fastify.post('/authenticate', responseSchema('tokenData#'), async (request, reply) => {
    const { db } = fastify;
    // bcrypt.hash("12345678", function(hash) {
    //   // Store hash in your password DB.
    //   console.log(md5(12345678));
    // });
    try {
      const { Models } = fastify.mgo;
      const { RolesUser, RolesPermissions } = Models;
      const Users = UsersModel(db);

      Users.findOne({
        where: {
          email: request.body.username,
          // password: request.body.password
          is_deleted: 0,
          is_locked: 0,
          is_verified: 1
        }
      }).then(async (d) => {
        if (d && compareCrypt(request.body.password, d.dataValues.password)) {
          if (d.dataValues.companyId === null) {
            reply.send({
              errors: [C.MSG.AUTHENTICATION_NO_COMPANYID],
              code: C.CODE.AUTHENTICATION
            });
          }
          const rid = await RolesUser.findOne({ 'user.uid': d.dataValues.id, 'user.companyId': d.dataValues.companyId }, 'role.rid -_id');
          // console.log(rid)
          const roles = await RolesPermissions.find({ 'role.rid': rid.role.rid }, '-_id -rtpId');

          const claims = new Claims(fastify);
          delete d.dataValues.password;
          claims.profile(d.dataValues);
          claims.scope(roles);
          const token = fastify.jwt.sign(claims.claims);
          reply.send({
            accessToken: token,
            expires: '3600'
          });
        } else {
          reply.send({
            errors: [C.MSG.AUTHENTICATION_NO_USER],
            code: C.CODE.AUTHENTICATION
          });
        }
      });
    } catch (err) {
      return err;
    }
  });
};
