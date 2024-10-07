const { Router } = require('express');
const routerProduct = require('./product.router');
const routerService = require('./service.router');
const routerContact = require('./contact.router');

const routerApi = (app) => {
 const router = Router();
 app.use('/api/v1', router);
 router.use('/productos', routerProduct);
 router.use('/servicios', routerService);
 router.use('/contactos', routerContact);
};

module.exports = routerApi;
