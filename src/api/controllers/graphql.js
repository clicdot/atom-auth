'use strict';

const fp = require('fastify-plugin');
const gql = require('fastify-gql');
const schema = require('../../schemas/graphql');

module.exports = fp(async (fastify, opts) => {
  fastify.register(gql, {
    schema,
    graphiql: true
  });
});
