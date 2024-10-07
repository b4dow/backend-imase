'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');
const { SERVICE_TABLE } = require('../models/service.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  try {
   await queryInterface.createTable('Product', {
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
    updatedAt: {
     type: Sequelize.DataTypes.DATE,
     field: 'update_at',
     defaultValue: Sequelize.NOW,
     allowNull: false,
    },
   });
   await queryInterface.createTable('Service', {
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
    updatedAt: {
     type: Sequelize.DataTypes.DATE,
     field: 'update_at',
     defaultValue: Sequelize.NOW,
     allowNull: false,
    },
   });
  } catch (error) {
   console.error('Error creating tables:', error);
   throw error;
  }
 },

 async down(queryInterface, Sequelize) {
  await queryInterface.dropTable(PRODUCT_TABLE);
  await queryInterface.dropTable(SERVICE_TABLE);
 },
};
