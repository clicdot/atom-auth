'use strict';

const Sequelize = require('sequelize');
const Error = require('../globals/throwError');

module.exports = (sequelize) => {
  const type = Sequelize;
  try {
    return sequelize.define('user', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: type.STRING,
      profile_id: type.INTEGER,
      password: type.STRING,
      created_at: type.DATE,
      updated_at: type.DATE,
      last_logged_in: type.DATE,
      is_verified: type.BOOLEAN,
      is_locked: type.BOOLEAN,
      is_deleted: type.BOOLEAN,
      chat_id: type.STRING,
      account_id: type.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    });
  } catch (err) {
    Error([
      err.message,
      'Most likely sequelize driver is not on'
    ], 500);
  }
};
