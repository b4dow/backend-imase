const { Product, productSchema } = require('./product.model');
const { Service, ServicesSchema } = require('./service.model');

const setupModels = (sequelize) => {
 Product.init(productSchema, Product.config(sequelize));
 Service.init(ServicesSchema, Service.config(sequelize));
};

module.exports = setupModels;
