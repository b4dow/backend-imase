const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductService {
 async find(query) {
  try {
   const options = {
    where: {},
    order: [['name', 'DESC']],
   };

   const { limit, offset } = query;
   if (limit && offset) {
    options.limit = limit;
    options.offset = offset;
   }

   const { name } = query;
   if (name) {
    options.where.name = {
     [Op.iLike]: `%${name}%`,
    };
   }

   const products = await models.Product.findAll(options);
   const productCount = await models.Product.count(options);
   if (!products) {
    return boom.notFound('No hay productos');
   }
   return { products, productCount };
  } catch (error) {
   throw boom.notFound('No fue posible encontrar los productos');
  }
 }

 async create(body) {
  try {
   const newProduct = await models.Product.create(body);
   return newProduct;
  } catch (error) {
   throw boom.badImplementation('No se puede crear el Producto');
  }
 }

 async findOne(id) {
  const product = await models.Product.findByPk(id);
  if (!product) {
   throw boom.notFound('no se encontro el producto');
  }

  return product;
 }
 async findAvailibility(id) {
  const findProduct = await this.findOne(id);

  findProduct.available = !findProduct.dataValues.available;
  return await findProduct.save();
 }

 async update(id, changes) {
  const findProduct = await this.findOne(id);

  const product = await findProduct.update(changes);
  return product;
 }

 async delete(id) {
  const findProduct = await this.findOne(id);
  await findProduct.destroy(id);
  return { msg: 'Producto Eliminado' };
 }
}

module.exports = ProductService;
