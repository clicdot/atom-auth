const appRoot = require('app-root-path');

const dotenv = require('dotenv').config({
  path: appRoot + '/src/.env'
});

module.exports = dotenv;
