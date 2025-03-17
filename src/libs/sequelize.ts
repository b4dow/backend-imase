import { Sequelize } from 'sequelize-typescript';
import { Product } from '../db/models/product.model';
import { User } from '../db/models/user.model';
import { Service } from '../db/models/service.model';
import config from '../config/config';

const { dbHost, dbName, dbUser, dbPassword } = config;

const sequelize = new Sequelize({
 host: dbHost,
 dialect: 'postgres',
 username: dbUser,
 database: dbName,
 password: dbPassword,
 logging: false,
 dialectOptions: {
  ssl: {
   require: true,
   rejectUnauthorized: false,
  },
 },

 models: [Product, User, Service],
});

export default sequelize;
