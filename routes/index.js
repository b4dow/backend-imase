const { Router } = require('express');
const routerProduct = require('./product.router');
const routerService = require('./service.router');

const routerApi = (app) => {
 const router = Router();
 app.use('/api/v1', router);
 router.use('/productos', routerProduct);
 router.use('/servicios', routerService);
};

module.exports = routerApi;
