'use strict';

const { SERVICE_TABLE } = require('../models/service.model');

module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.changeColumn(SERVICE_TABLE, 'description', {
   type: Sequelize.DataTypes.STRING(1000),
  });
 },

 async down(queryInterface, Sequelize) {},
};
