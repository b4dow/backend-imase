const { Product, productSchema } = require('./product.model');
const { Service, ServicesSchema } = require('./service.model');
const { User, userSchema } = require('./user.model');

const setupModels = (sequelize) => {
 Product.init(productSchema, Product.config(sequelize));
 Service.init(ServicesSchema, Service.config(sequelize));
 User.init(userSchema, User.config(sequelize));
};

module.exports = setupModels;
