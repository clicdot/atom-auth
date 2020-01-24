'use strict';

const responseSchema = require('../../../schemas/response');
// const Humio = require('humio');

// const humio = new Humio({
//   // apiToken: process.env.HUMIO_INJESTKEY, // needed if you use the administration api
//   ingestToken: process.env.HUMIO_INJESTKEY, // the default ingest tokens to use for #run and #stream
//   host: "cloud.humio.com", // the host name
//   port: 443, // default (443), the port Humio is run on
//   basePath: "/", // default ("/"), basePath prepended to all API URLs.
//   repository: "sandbox" // default ("sandbox"), the default repository (or view) to work with
// });

// const humio = new Humio({
//   apiToken: process.env.HUMIO_INJESTKEY,
//   ingestToken: process.env.HUMIO_INJESTKEY,
//   host: process.env.HUMIO_HOST || "cloud.humio.com",
//   dataspaceId: process.env.HUMIO_DATASPACE_ID || "sandbox"
// });

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  });

  fastify.get('/', responseSchema('testData#'), async (request, reply) => {
    // request.log.error('Error 123: Something went wrong...');
    // const { redis } = fastify;
    // fastify.db.query('SELECT * FROM AssetMgmt.Status').then(([results, metadata]) => {
    //   // Results will be an empty array and metadata will contain the number of affected rows.
    //   console.log(results);
    // });
    // fastify.mysql.query(
    //   'SELECT * FROM AssetMgmt.Status',
    //   function onResult (err, result) {
    //     // reply.send(err || result)
    //     console.log(err, result);
    //     // fastify.mysql.pool.end();
    //   }
    // );
    // const { processor } = fastify;
    // console.log(processor);
    // const { mgo } = fastify;
    // const { Roles } = mgo.Models;
    // console.log('MODELS', mgo.Models);
    // Roles.find((err, data) => {
    //   console.log(err, data);
    // });
    // const { humio } = fastify;
    // console.log(humio);
    // humio.sendJson({test:2});
    // humio.sendMessage(
    //   "2018-01-19T12:58:34.441Z [warn] User login failed. username=admin ip=101.127.184.11",
    //   {'domain': 'example.com'}
    // );
    reply.statusCode = 200;
    reply
      .code(reply.statusCode)
      .send({ test: 'Hello World' });
  });
};
