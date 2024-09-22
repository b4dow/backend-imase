'use strict';

const { PRODUCT_TABLE, productSchema } = require("../models/product.model");
const { SERVICE_TABLE, ServicesSchema } = require("../models/service.model");


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, productSchema)
    await queryInterface.createTable(SERVICE_TABLE, ServicesSchema)
    
  },

  async down (queryInterface) {
   queryInterface.dropTable(PRODUCT_TABLE)
   queryInterface.dropTable(SERVICE_TABLE)
  }
};
