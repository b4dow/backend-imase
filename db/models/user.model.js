const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'User';

const userSchema = {
 id: {
  type: DataTypes.UUID,
  allowNull: false,
  defaultValue: Sequelize.UUIDV4,
  primaryKey: true,
 },
 username: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
 },
 password: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 role: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'customer',
 },
 createdAt: {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: Sequelize.NOW,
 },
 updatedAt: {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: Sequelize.NOW,
 },
};

class User extends Model {
 static associate(models) {
  // define association here
 }
 static config(sequelize) {
  return {
   sequelize,
   tableName: USER_TABLE,
   modelName: 'User',
   timestamps: false,
  };
 }
}

module.exports = {
 USER_TABLE,
 userSchema,
 User,
};
