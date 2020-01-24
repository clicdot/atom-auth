'use strict';

const fp = require('fastify-plugin');
const R = require('../helpers/response');

module.exports = fp(async (fastify, opts) => {
  fastify
    .addHook('onSend', (request, reply, payload, next) => {
      // console.log('OnSend', payload, JSON.parse(payload));
      let nPayload;

      if (payload instanceof Object) {
        nPayload = payload;
      } else {
        const payl = JSON.parse(payload);

        if (Object.prototype.hasOwnProperty.call(payl, 'statusCode') && payl.statusCode > 400) {
          const resp = new R();
          resp.$init(request, reply);

          // if (Object.prototype.hasOwnProperty.call(payl, 'errors') || Object.prototype.hasOwnProperty.call(payl, 'warnings') || Object.prototype.hasOwnProperty.call(payl, 'infos')) {
          //   // console.log('ERRORS', Object.keys(payl));
          //   // resp.$msg()
          //   const keys = Object.keys(payl);
          //   let i = 0; const iMax = keys.length;

          //   for (; i < iMax; i++) {
          //     if (keys[i] !== 'code') {
          //       resp.$msg(keys[i], payl[keys[i]]);
          //     }
          //     if (keys[i] === 'code') {
          //       resp.$inject('code', payl[keys[i]]);
          //     }
          //   }
          // // Process payload normally
          // } else {
          resp.$data(payl);
          if (Object.prototype.hasOwnProperty.call(payl, 'statusCode') && payl.statusCode >= 400) {
            resp.$inject('code', payl.statusCode);
            resp.$msg('errors', [payl.error, payl.message]);
            resp.$data([]);
          }
          // }
          nPayload = JSON.stringify(resp.$send());
        }
      }

      next(null, nPayload);
    });
});
