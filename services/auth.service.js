const boom = require('@hapi/boom');
const { comparePassword } = require('../utils');
const UserService = require('./user.service');

const service = new UserService();

class AuthService {
 async getUserByEmail(email, password) {
  try {
   const user = await service.findByEmail(email);
   if (!user) {
    throw boom.unauthorized();
   }
   const isMatch = await comparePassword(password, user.password);
   if (!isMatch) {
    throw boom.unauthorized();
   }
   delete user.dataValues.password;
   return user;
  } catch (error) {
   boom.notFound('Hubo un error al buscar el usuario');
  }
 }
}

module.exports = AuthService;
