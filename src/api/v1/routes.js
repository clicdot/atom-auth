'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload-recursive');

module.exports = (fastify, opts, next) => {
  fastify
    .addHook('onRequest', (request, reply, next) => {
      request.appVersion = 'v1';

      next();
    })
    // Do not touch the following lines

    // This loads all plugins defined in services
    // define your routes in one of these
    .register(AutoLoad, {
      dir: path.join(__dirname, 'controllers'),
      options: Object.assign({ prefix: 'api/v1' }, opts)
    });

  // Make sure to call next when done
  next();
};
