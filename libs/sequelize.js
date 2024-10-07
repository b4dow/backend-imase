const { Sequelize } = require('sequelize');
const config = require('../config/config');
const setupModels = require('../db/models');

const { dbDialect, dbName, dbPassword, dbHost, dbPort, dbUser } = config;

const username = encodeURIComponent(dbUser);
const password = encodeURIComponent(dbPassword);

const URI = `${dbDialect}://${username}:${password}@${dbHost}/${dbName}`;

const sequelize = new Sequelize(URI, {
 dialect: dbDialect,
 logging: console.log,
 dialectOptions: {
  ssl: {
   require: true,
  },
 },
});

setupModels(sequelize);


module.exports = sequelize;
