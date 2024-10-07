const { Router } = require('express');

const router = Router();
const validatorHandler = require('../middleware/validator.handler');
const sendMail = require('../libs/nodemailer');
const { createContactSchema } = require('../schemas/contact.schema');

router.post(
 '/',
 validatorHandler(createContactSchema, 'body'),
 async (req, res, next) => {
  const { name, email, message } = req.body;
  try {
   await sendMail(name, email, message);
   console.log(req.body);
   res.send('Correo Enviado');
  } catch (error) {
   next(error);
  }
 }
);

module.exports = router;
