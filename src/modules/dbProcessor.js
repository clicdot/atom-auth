'use strict';

// const Model = require('../models/models');

class Processor {
  constructor (db) {
    this.db = db;
  }

  connection () {
    return this.db;
  }

  query (sql, data) {
    return this.db.query(sql, data);
  }
}

module.exports = Processor;
