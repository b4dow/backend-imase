const { Router } = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middleware/validator.handler');
const { createProductSchema } = require('../schemas/product.schema');
const { uploadImage } = require('../libs/cloudinary');

const router = Router();

const service = new ProductService();

router.post(
 '/',
 validatorHandler(createProductSchema, 'body'),
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
   res.send('producto creado');
  } catch (error) {
   next(error);
  }
 }
);

router.get('/', async (req, res, next) => {
 try {
  const product = await service.find(req.query);
  res.json({ data: product });
 } catch (error) {
  next(error);
 }
});

router.get('/:id', async (req, res, next) => {
 try {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.json({ data: product });
 } catch (error) {
  next(error);
 }
});

router.put('/:id', async (req, res, next) => {
 try {
  const { id } = req.params;
  const { name, description, image, url } = req.body;
  const convertImage = await uploadImage(image);
  await service.update(id, {
   name,
   description,
   image: image ? convertImage : image,
   url,
  });
  res.send('producto actualizado');
 } catch (error) {
  next(error);
 }
});

router.patch('/:id', async (req, res, next) => {
 try {
  const { id } = req.params;
  const product = await service.findAvailibility(id);
  res.json({ data: product });
 } catch (error) {
  next(error);
 }
});

router.delete('/:id', async (req, res, next) => {
 try {
  const { id } = req.params;
  const producto = await service.delete(id);
  res.json({ data: producto });
 } catch (error) {
  next(error);
 }
});

module.exports = router;
