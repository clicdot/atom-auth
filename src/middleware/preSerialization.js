'use strict';

const fp = require('fastify-plugin');
const R = require('../helpers/response');

module.exports = fp(async (fastify, opts) => {
  fastify
    .addHook('preSerialization', (request, reply, payload, done) => {
      // console.log('preSerialization', payload);
      const { humio } = fastify;

      const resp = new R();

      const payl = JSON.parse(JSON.stringify(payload));

      resp.$init(request, reply);

      if (Object.prototype.hasOwnProperty.call(payl, 'errors') || Object.prototype.hasOwnProperty.call(payl, 'warnings') || Object.prototype.hasOwnProperty.call(payl, 'infos')) {
        // console.log('ERRORS', Object.keys(payl));
        // resp.$msg()
        const keys = Object.keys(payl);
        let i = 0; const iMax = keys.length;

        for (; i < iMax; i++) {
          if (keys[i] !== 'code') {
            resp.$msg(keys[i], payl[keys[i]]);
          }
          if (keys[i] === 'code') {
            resp.$inject('code', payl[keys[i]]);
          }
        }
      // Process payload normally
      } else {
        resp.$data(payl);
      }

      const nPayload = resp.$send();

      humio.sendJson(nPayload);

      // console.log('PAYLOAD', nPayload);
      done(null, nPayload);
    });
});
