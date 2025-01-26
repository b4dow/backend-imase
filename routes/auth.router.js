const express = require('express');
const passport = require('passport');
const { generateJWT } = require('../utils');
const config = require('../config/config');
const boom = require('@hapi/boom');
const UserService = require('../services/user.service');

const router = express.Router();
const service = new UserService();

router.post(
 '/login',
 passport.authenticate('local', { session: false }),
 async (req, res, next) => {
  try {
   const user = req.user;
   const payload = {
    sub: user.id,
    role: user.role,
   };
   const token = generateJWT(payload, config.jwtSecret);
   res.cookie('token', token, {
    httpOnly: true,
    secure: config.env === 'production' ? true : false,
    sameSite: config.env === 'production' ? 'strict' : 'none',
   });
   res.json(token);
  } catch (error) {
   next(error);
  }
 }
);

router.get(
 '/user',
 passport.authenticate('jwt', { session: false }),
 async (req, res) => {
  try {
   const user = await service.findOne(req.user.sub);
   delete user.dataValues.password;

   res.json(user);
  } catch (error) {
   next(error);
  }
 }
);

module.exports = router;
