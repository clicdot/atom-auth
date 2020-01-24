'use strict';

function define (obj, name, value) {
  Object.defineProperty(obj, name, {
    value,
    enumerable: true,
    writable: false,
    configurable: false
  });
}

exports.CODE = {};

define(exports.CODE, 'APPLICATION_ERROR', 406);
define(exports.CODE, 'AUTHENTICATION', 401);
define(exports.CODE, 'FORBIDDEN', 403);
define(exports.CODE, 'SUCCESS', 200);
define(exports.CODE, 'NOT_FOUND', 404);
define(exports.CODE, 'NOT_ALLOWED', 405);
define(exports.CODE, 'NOT_ACCEPTABLE', 406);
define(exports.CODE, 'INTERNAL_SERVER_ERROR', 500);

exports.MSG = {};

define(exports.MSG, 'AUTHENTICATION_NO_USER', 'Authentication Error: No valid user found');
define(exports.MSG, 'AUTHENTICATION_NO_COMPANYID', 'Authentication Error: No valid companyId found');
define(exports.MSG, 'AUTHENTICATION_GENERIC', 'Authentication Error: Something went wrong');
define(exports.MSG, 'DATA_ERROR', 'Data Error: Something went wrong');
define(exports.MSG, 'DATA_ERROR_CREATE', 'Data Error: Already exists');

exports.CONST = {};

define(exports.CONST, 'ATMZSERVER', process.env.ATMZSERVER);
