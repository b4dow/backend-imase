const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
 const salt = await bcrypt.genSalt(10);
 return bcrypt.hash(password, salt);
};

const comparePassword = (password, hash) => {
 return bcrypt.compare(password, hash);
};

const generateJWT = (payload, secret) => {
 return jwt.sign(payload, secret, {
  expiresIn: '180d',
 });
};

module.exports = { hashPassword, comparePassword, generateJWT };
