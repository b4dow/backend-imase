const { Router } = require('express');
const ServicesService = require('../services/service.service');
const validatorHandler = require('../middleware/validator.handler');
const {
 createServiceSchema,
 updateServiceSchema,
 getServiceSchema,
} = require('../schemas/service.schema');
const { cloudinary } = require('../libs/cloudinary');
const router = Router();
const service = new ServicesService();

router.post('/upload', async (req, res, next) => {
 const data = req.body;
 const base64String = Object.keys(data)[0];

 try {
  const result = await cloudinary.uploader.upload(base64String, {
    upload_preset: 'dev_setups',
  });
  console.log(result)
 } catch (error) {
  console.log(error);
  next(error);
 }
});

router.post(
 '/',
 validatorHandler(createServiceSchema, 'body'),
 async (req, res, next) => {
  console.log(req.body);
  try {
   const newService = await service.create(req.body);
   res.status(201).json(newService);
  } catch (error) {
   next(error);
  }
 }
);

router.get('/', async (req, res, next) => {
 try {
  const services = await service.find(req.query);
  console.log(services);
  res.json({ data: services });
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
  try {
   const { id } = req.params;
   const body = req.body;
   const updateService = await service.update(id, body);
   res.json({ data: updateService });
  } catch (error) {
   next(error);
  }
 }
);

router.delete(
 '/:id',
 validatorHandler(getServiceSchema, 'params'),
 async (req, res, next) => {
  try {
   const { id } = req.params;
   const deleteService = await service.delete(id);
   res.json(deleteService);
  } catch (error) {
   next(error);
  }
 }
);

module.exports = router;
