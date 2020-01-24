'use strict';

const awsLambdaFastify = require('aws-lambda-fastify');
const fastify = require('fastify');
const fp = require('fastify-plugin');

const app = require('./src/app');
const App = fastify()
  .register(require('./src/adapter/dbconnect'))
  .register(fp(app));
require('./src/environment/env');

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml'
];

// test
// const proxy = awsLambdaFastify(app)
// or
const proxy = awsLambdaFastify(App, { binaryMimeTypes: binaryMimeTypes });

// exports.handler = proxy;
// or
// exports.handler = (event, context, callback) => proxy(event, context, callback);
// or
// exports.handler = (event, context) => proxy(event, context);
// or
exports.handler = async (event, context) => proxy(event, context);
