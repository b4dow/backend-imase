const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { uploadImage, deleteImage } = require('../libs/cloudinary');

class ServicesService {
 constructor() {}

 async create(body) {
  const { name, description, image, url } = body;
  const serviceExist = await models.Service.findOne({
   where: { name },
  });
  if (serviceExist) {
   boom.badRequest('Servicio ya existe');
  }
  const convertImage = await uploadImage(image);
  const data = {
   name,
   description,
   image: convertImage.secure_url,
   public_id: convertImage.public_id,
   url,
  };
  const service = await models.Service.create(data);
  return service;
 }

 async find(query) {
  try {
   const options = {
    where: {},
    order: [['createdAt', 'DESC']],
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

   const services = await models.Service.findAll(options);
   const servicesCount = await models.Service.count(options);
   return {
    services,
    servicesCount,
   };
  } catch (error) {
   throw boom.badImplementation('Error al encontrar el servicio');
  }
 }

 async findOne(id) {
  const service = await models.Service.findByPk(id);
  if (!service) {
   throw boom.notFound('servicio no disponible');
  }

  return service;
 }

 async findAvailibility(id) {
  const findService = await this.findOne(id);

  findService.available = !findService.dataValues.available;
  return await findService.save();
 }

 async update(id, body) {
  const findService = await this.findOne(id);
  if (body.image !== findService.image) {
   await deleteImage(findService.public_id);
   body.image = await uploadImage(body.image);
  }

  findService.name = body.name;
  findService.description = body.description;
  findService.image = body.image?.secure_url;
  findService.public_id =
   body.image !== findService.image
    ? body.image.public_id
    : findService.public_id;

  await findService.save();

  return findService;
 }

 async delete(id) {
  const findService = await this.findOne(id);
  await deleteImage(findService.public_id);
  await findService.destroy();
 }
}

module.exports = ServicesService;
