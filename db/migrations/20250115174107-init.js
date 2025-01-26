'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');
const { SERVICE_TABLE } = require('../models/service.model');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  queryInterface.createTable(PRODUCT_TABLE, {
   id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    required: true,
    primaryKey: true,
   },
   name: {
    type: Sequelize.DataTypes.STRING,
    required: true,
    unique: true,
   },
   description: {
    type: Sequelize.DataTypes.STRING(1000),
    required: true,
   },
   image: {
    type: Sequelize.DataTypes.STRING,
    required: true,
   },
   public_id: {
    type: Sequelize.DataTypes.STRING,
    required: true,
   },
   url: {
    type: Sequelize.DataTypes.STRING,
    required: true,
   },
   available: {
    type: Sequelize.DataTypes.BOOLEAN,
    required: true,
    defaultValue: true,
   },
   createdAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    required: true,
   },
   updatedAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    required: true,
   },
  });

  queryInterface.createTable(SERVICE_TABLE, {
   id: {
    required: true,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
   },
   name: {
    type: Sequelize.DataTypes.STRING,
    required: true,
    unique: true,
   },
   description: {
    type: Sequelize.DataTypes.STRING(1000),
    required: true,
   },
   image: {
    type: Sequelize.DataTypes.STRING,
    required: true,
   },
   public_id: {
    type: Sequelize.DataTypes.STRING,
    required: true,
   },
   url: {
    type: Sequelize.DataTypes.STRING,
    required: true,
   },
   available: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
    required: true,
   },
   createdAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    required: true,
   },
   updatedAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    required: true,
   },
  });

  queryInterface.createTable(USER_TABLE, {
   id: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
   },
   username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
   },
   email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true,
   },
   password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
   },
   role: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    defaultValue: 'customer',
   },
   createdAt: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
   },
   updatedAt: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
   },
  });
 },

 async down(queryInterface, Sequelize) {
  queryInterface.dropTable(PRODUCT_TABLE);
  queryInterface.dropTable(SERVICE_TABLE);
  queryInterface.dropTable(USER_TABLE);
 },
};
