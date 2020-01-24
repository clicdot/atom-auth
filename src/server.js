'use strict';

const Fastify = require('fastify');
const fp = require('fastify-plugin');
const fs = require('fs-extra');
const appRoot = require('app-root-path');
// const pino = require('pino');
// const logpath = './logs/error.log';

// require('./createLog')(logpath);

// const logger = pino({ level: 'info' }, logpath);

const start = async () => {
  try {
    if (!fs.existsSync(appRoot + '/src/.env')) {
      // file doesn't exists
      throw Object.assign(
        new Error('No .env found in \'src\' folder'),
        { code: 402 }
      );
    }
    require('./environment/env');

    const app = require('./app');
    const fastify = Fastify({
      logger: false,
      pluginTimeout: 10000
    })
      .register(require('./adapter/dbconnect'))
      .register(fp(app));

    await fastify.listen(process.env.PORT, '0.0.0.0', (err, address) => {
      if (err) throw err;
      console.log(`server listening on ${address}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
