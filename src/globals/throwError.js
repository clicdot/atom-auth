'use strict';

module.exports = (error, code) => {
  throw Object.assign({}, {
    errors: error,
    code: code
  });
};
