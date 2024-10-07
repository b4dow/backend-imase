'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');
const { SERVICE_TABLE } = require('../models/service.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.createTable(PRODUCT_TABLE, {
   id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
   },
   name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
   },
   description: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
   },
   image: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
   },
   url: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
   },
   available: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
   },
   createdAt: {
    type: Sequelize.DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
    allowNull: false,
   },
  });
  await queryInterface.createTable(SERVICE_TABLE, {
   id: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
   },
   name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
   },
   description: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
   },
   image: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
   },
   url: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
   },
   available: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
   },
   createdAt: {
    type: Sequelize.DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
    allowNull: false,
   },
  });
 },

 async down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  await queryInterface.dropTable(PRODUCT_TABLE);
  await queryInterface.dropTable(SERVICE_TABLE);
 },
};
