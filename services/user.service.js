const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { hashPassword } = require('../utils');

class UserService {
 constructor() {}

 async create(data) {
  const user = await models.User.findOne({
   where: { email: data.email },
  });
  if (user) {
   throw boom.notFound('Usuario ya existe');
  }
  const hash = await hashPassword(data.password);
  const newUser = await models.User.create({
   ...data,
   password: hash,
  });
  delete newUser.dataValues.password;
  return newUser;
 }

 async find() {
  const rta = await models.User.findAll();
  return rta;
 }

 async findByEmail(email) {
  const user = await models.User.findOne({ where: { email } });
  if (!user) {
   throw boom.notFound('Usuario no registrado');
  }
  return user;
 }

 async findOne(id) {
  const user = await models.User.findByPk(id);
  if (!user) {
   throw boom.notFound('Usuario no encontrado');
  }
  return user;
 }

 async update(id, changes) {
  const user = await this.findOne(id);
  const rta = await user.update(changes);
  return rta;
 }

 async delete(id) {
  const user = await this.findOne(id);
  await user.destroy();
  return { id };
 }
}

module.exports = UserService;
