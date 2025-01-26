'use strict';

const { SERVICE_TABLE } = require('../models/service.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(SERVICE_TABLE, 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn(SERVICE_TABLE, 'createAt')
  }
};
