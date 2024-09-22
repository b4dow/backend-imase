const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ServicesService {
 constructor() {}

 async create(data) {
    try {
     const service = await models.Service.create(data);
  
     return service;
    } catch (error) {
     throw boom.notFound('No fue posible crear el servicio');
    }
   }

  async upload(file) {
    const imageResponse = await uploadImage(file);
    return imageResponse
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

 async update(id, changes) {
  const findService = await this.findOne(id);

  const newService = await findService.update(changes);
  return newService;
 }

 async delete(id) {
  const findService = await this.findOne(id);

  await findService.destroy();
  return { msg: 'Servicio Eliminado' };
 }
}

module.exports = ServicesService;
