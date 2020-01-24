'use strict';

const uuidv4 = require('uuid/v4');

class Claims {
  constructor (fastify) {
    const unix = Math.floor(new Date() / 1000);
    this.claims = {
      iat: unix,
      exp: unix + 3600,
      sub: 'anonymous',
      jti: uuidv4(),
      profile: {},
      scope: []
    };
  }

  profile (profile) {
    this.claims.profile = profile;
  }

  scope (scope) {
    this.claims.scope = scope;
  }
}

module.exports = Claims;
