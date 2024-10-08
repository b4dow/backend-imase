'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.changeColumn(PRODUCT_TABLE, 'description', {
   type: Sequelize.DataTypes.STRING(1000),
  });
 },

 async down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
 },
};
