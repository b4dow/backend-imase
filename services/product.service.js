const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { uploadImage, deleteImage } = require('../libs/cloudinary');

class ProductService {
  async create(body) {
    const { name, description, image, url } = body;
    const productExist = await models.Product.findOne({
      where: { name },
    });
    // validar si el producto ya existe
    if (productExist) {
      throw boom.badRequest('Producto ya existe');
    }
    // subir imagen a cloudinary
    const convertImage = await uploadImage(image);
    // crear producto
    const newProduct = await models.Product.create({
      name,
      description,
      image: convertImage.secure_url,
      public_id: convertImage.public_id,
      url,
    });
    return newProduct;
  }

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

      const { search } = query;
      if (search) {
        options.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      const products = await models.Product.findAll(options);
      const count = await models.Product.count(options);
      return { products, count };
    } catch (error) {
      console.log(error)
      throw boom.notFound('No fue posible encontrar los productos');
    }
  }

  // Product by name
  async findByName(name) {
    const product = await models.Product.findOne({
      where: {
        name: {
          [Op.iLike]: `%${name}`
        }
      }
    })
    if (!product) {
      throw boom.notFound('No se encontro el producto');
    }
    return product
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

  async update(id, body) {
    const findProduct = await this.findOne(id);

    if (body.image !== findProduct.image) {
      // base64 !== res.cloudinary
      await deleteImage(findProduct.public_id);
      body.image = await uploadImage(body.image);
    }

    findProduct.name = body.name;
    findProduct.description = body.description;
    findProduct.image = body.image?.secure_url;
    findProduct.public_id =
      body.image === findProduct.image
        ? findProduct.public_id
        : body.image.public_id;
    findProduct.url = body.url;
    await findProduct.save();

    return findProduct;
  }

  async delete(id) {
    const findProduct = await this.findOne(id);
    await deleteImage(findProduct.public_id);
    await findProduct.destroy();
  }
}

module.exports = ProductService;
