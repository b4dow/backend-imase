const { DataTypes, Model, Sequelize } = require('sequelize');

const SERVICE_TABLE = 'Service';

const ServicesSchema = {
 id: {
  required: true,
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
 },
 name: {
  type: DataTypes.STRING,
  required: true,
  unique: true,
 },
 description: {
  type: DataTypes.STRING(1000),
  required: true,
 },
 image: {
  type: DataTypes.STRING,
  required: true,
 },
 public_id: {
  type: DataTypes.STRING,
  required: true,
 },
 url: {
  type: DataTypes.STRING,
  required: true,
 },
 available: {
  type: DataTypes.BOOLEAN,
  defaultValue: true,
  required: true,
 },
 createdAt: {
  type: DataTypes.DATE,
  field: 'create_at',
  defaultValue: Sequelize.NOW,
  required: true,
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
