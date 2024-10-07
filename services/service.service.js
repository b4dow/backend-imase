const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { uploadImage } = require('../libs/cloudinary');

class ServicesService {
 constructor() {}

 async create(data) {
  try {
   const service = await models.Service.create(data);
   return service;
  } catch (error) {
   console.log(error);
   throw boom.notFound('No fue posible crear el servicio');
  }
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

 async update(id, changes) {
  const findService = await this.findOne(id);

  const newService = await findService.update(changes);
  return newService;
 }

 async delete(id) {
  const findService = await this.findOne(id);
  await findService.destroy();
 }
}

module.exports = ServicesService;
