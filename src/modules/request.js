'use strict';

const C = require('../constants/constants');
const RP = require('request-promise-native');

class RequestPromise {
  constructor (fastify) {
    // const { RP } = fastify;
    this.rp = RP;
    this.api = {
      atmzServer: C.CONST.ATMZSERVER
    };
  }

  request (api, service) {
    const endPoint = `${this.api[api]}/${service}`;

    return this.rp.defaults({
      baseUrl: endPoint,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    });
  }
}

module.exports = RequestPromise;
