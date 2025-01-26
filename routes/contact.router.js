const { Router } = require('express');
const ContactService = require('../services/contact.service');

const service = new ContactService();

const router = Router();
const validatorHandler = require('../middleware/validator.handler');
const { createContactSchema } = require('../schemas/contact.schema');

router.post(
  '/',
  validatorHandler(createContactSchema, 'body'),
  async (req, res, next) => {
    try {
      const rta = await service.send(req.body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
