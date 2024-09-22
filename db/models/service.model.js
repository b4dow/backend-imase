const { DataTypes, Model, Sequelize } = require('sequelize');

const SERVICE_TABLE = 'Service';

const ServicesSchema = {
 id: {
  allowNull: false,
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
 },
 name: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
 },
 description: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 image: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 url: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 available: {
  type: DataTypes.BOOLEAN,
  defaultValue: true,
  allowNull: false,
 },
 createdAt: {
  type: DataTypes.DATE,
  field: 'create_at',
  defaultValue: Sequelize.NOW,
  allowNull: false,
 },
};

class Service extends Model {
 static associate(models) {}

 static config(sequelize) {
  return {
   sequelize,
   tableName: SERVICE_TABLE,
   modelName: 'Service',
   timestamp: false,
  };
 }
}

module.exports = {
 SERVICE_TABLE,
 ServicesSchema,
 Service,
};
