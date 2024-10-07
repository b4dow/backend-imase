const { Router } = require('express');
const ServicesService = require('../services/service.service');
const validatorHandler = require('../middleware/validator.handler');
const {
 createServiceSchema,
 updateServiceSchema,
 getServiceSchema,
} = require('../schemas/service.schema');
const { uploadImage } = require('../libs/cloudinary');

const router = Router();
const service = new ServicesService();

router.post(
 '/',
 validatorHandler(createServiceSchema, 'body'),
 async (req, res, next) => {
  const { name, description, image, url } = req.body;
  try {
   const convertImage = await uploadImage(image);

   await service.create({
    name,
    description,
    image: convertImage.secure_url,
    url,
   });
   res.send('Servicio creado con éxito');
  } catch (error) {
   next(error);
  }
 }
);

router.get('/', async (req, res, next) => {
 try {
  const services = await service.find(req.query);
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
  const { id } = req.params;
  const { name, description, image, url } = req.body;
  try {
   const convertImage = image ? await uploadImage(image) : image;

   await service.update(id, {
    name,
    description,
    image: convertImage?.secure_url,
    url,
   });
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
