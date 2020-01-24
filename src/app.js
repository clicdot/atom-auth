'use strict';

const path = require('path');
const { readFileSync } = require('fs-extra');
const AutoLoad = require('fastify-autoload-recursive');

module.exports = (fastify, opts, next) => {
  fastify
    .register(require('fastify-helmet'))
    .register(require('fastify-cors'))
    .register(require('fastify-compress'), { encodings: ['deflate', 'gzip'] })
    // .use(compression())
    .register(require('fastify-jwt'), {
      secret: {
        private: readFileSync(`${path.join(__dirname, 'keys')}/authentication-private.key`, 'utf8'),
        public: readFileSync(`${path.join(__dirname, 'keys')}/authentication-public.key`, 'utf8')
      },
      sign: {
        algorithm: 'RS256',
        audience: 'https://automatize.com',
        issuer: 'api.automatize.com'
      },
      verify: {
        audience: 'https://automatize.com',
        issuer: 'api.automatize.com'
      }
    })
    .register(require('./helpers/swagger-ui'), {
      // swagger specification which should be exposed
      specification: {
        type: 'file',
        path: 'src/swagger/swagger20-with-extensions.json'
      },
      // path under which swagger-ui will be available
      path: 'swagger-ui'
    })

  // .register(require('fastify-circuit-breaker'), {
  //   threshold: 3, // default 5
  //   timeout: 5000, // default 10000
  //   resetTimeout: 5000 // default 10000
  // })

    // Auto Load Middleware
    .register(AutoLoad, {
      dir: path.join(__dirname, 'middleware')
    })

    // Auto Load Plugins
    .register(AutoLoad, {
      dir: path.join(__dirname, 'plugins')
    })

    // Serve static swagger ui
    .get('/swagger-ui/', (req, reply) => {
      reply.send();
    })

    .register(AutoLoad, {
      dir: path.join(__dirname, 'models/mongo')
    })

    // Auto Loads Schema Definitions and Models
    .register(require('./helpers/schemaAutoLoader'))

    // Auto Load Controllers
    .register(AutoLoad, {
      dir: path.join(__dirname, 'api/controllers')
    })

    /**
     * Version 1: File Upload API
     */
    .register(
      require('./api/v1/routes'),
      { options: process.env }
    );
  // .get('/', (request, reply) => reply.send({ hello: 'world', key: process.env.JWT_SECRET }));

  next();
};
