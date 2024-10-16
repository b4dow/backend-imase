const { DataTypes, Sequelize, Model } = require('sequelize');

const PRODUCT_TABLE = 'Product';
const productSchema = {
 id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  required: true,
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
  required: true,
  defaultValue: true,
 },
 createdAt: {
  type: DataTypes.DATE,
  field: 'create_at',
  defaultValue: Sequelize.NOW,
  required: true,
 },
};

class Product extends Model {
 static associate() {}

 static config(sequelize) {
  return {
   sequelize,
   tableName: PRODUCT_TABLE,
   modelName: 'Product',
   timestamp: false,
  };
 }
}

module.exports = {
 PRODUCT_TABLE,
 productSchema,
 Product,
};
