const { Router } = require('express');
const ServicesService = require('../services/service.service');
const validatorHandler = require('../middleware/validator.handler');
const {
  createServiceSchema,
  updateServiceSchema,
  getServiceSchema,
} = require('../schemas/service.schema');

const router = Router();
const service = new ServicesService();

router.post(
  '/',
  validatorHandler(createServiceSchema, 'body'),
  async (req, res, next) => {
    try {
      await service.create(req.body);
      res.send('servicio creado con éxito');
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const services = await service.find(req.query);

    res.json(services);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  validatorHandler(getServiceSchema, 'params'),
  validatorHandler(updateServiceSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      await service.update(id, req.body);
      res.send('Servicio editado con éxito');
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findAvailibility(id);
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  validatorHandler(getServiceSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.send('Servicio eliminado con éxito');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
