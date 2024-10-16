const { Router } = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middleware/validator.handler');
const { createProductSchema } = require('../schemas/product.schema');

const router = Router();

const service = new ProductService();

router.post(
 '/',
 validatorHandler(createProductSchema, 'body'),
 async (req, res, next) => {
  try {
   await service.create(req.body);
   res.send('producto creado');
  } catch (error) {
   next(error);
  }
 }
);

router.get('/', async (req, res, next) => {
 try {
  const product = await service.find(req.query);
  res.json(product);
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
  const body = req.body;

  await service.update(id, body);
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
  await service.delete(id);
  res.send('producto eliminado');
 } catch (error) {
  next(error);
 }
});

module.exports = router;
