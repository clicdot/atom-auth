'use strict';

const fp = require('fastify-plugin');
const Humio = require('humio');

module.exports = fp(async (fastify, opts) => {
  const humio = new Humio({
    apiToken: process.env.HUMIO_INJESTKEY,
    ingestToken: process.env.HUMIO_INJESTKEY,
    host: process.env.HUMIO_HOST || "cloud.humio.com",
    dataspaceId: process.env.HUMIO_DATASPACE_ID || "sandbox"
  });

  fastify.decorate('humio', humio);
});
