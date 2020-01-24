'use strict';

const fp = require('fastify-plugin');
const RP = require('../modules/request');

module.exports = fp(async (fastify, opts) => {
  const RPL = new RP(fastify);

  fastify.decorate('RP', {
    rp: RPL.rp,
    request: RPL.request
  });
});
