const { Router } = require('express');
const routerProducts = require('./products.router');
const routerProduct = require('./product.router');
const routerServices = require('./services.router');
const routerService = require('./service.router');
const routerContact = require('./contact.router');
const routerUser = require('./users.router');
const routerAuth = require('./auth.router');

const routerApi = (app) => {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/productos', routerProducts);
  router.use('/producto', routerProduct)
  router.use('/servicios', routerServices);
  router.use('/servicio', routerService)
  router.use('/contacto', routerContact);
  router.use('/users', routerUser);
  router.use('/auth', routerAuth);
};

module.exports = routerApi;
