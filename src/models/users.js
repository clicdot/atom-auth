'use strict';

const Sequelize = require('sequelize');
const Error = require('../globals/throwError');

module.exports = (sequelize) => {
  const type = Sequelize;
  try {
    return sequelize.define('users', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: type.STRING,
      profile_id: type.INTEGER,
      user_role_id: type.INTEGER,
      companyId: type.INTEGER,
      entity_type: type.STRING,
      entity_table_name: type.STRING,
      password: type.STRING,
      chat_id: type.STRING,
      first_name: type.STRING,
      middle_name: type.STRING,
      last_name: type.STRING,
      phone_number: type.STRING,
      home_number: type.STRING,
      gender: type.BOOLEAN,
      time_zone: type.STRING,
      description: type.STRING,
      address_name: type.STRING,
      address1: type.STRING,
      address2: type.STRING,
      zip: type.STRING,
      tax_id: type.STRING,
      department: type.STRING,
      address_is_deleted: type.BOOLEAN,
      is_verified: type.BOOLEAN,
      is_locked: type.BOOLEAN,
      is_deleted: type.BOOLEAN,
      created_at: type.DATE,
      updated_at: type.DATE,
      last_logged_in: type.DATE
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
