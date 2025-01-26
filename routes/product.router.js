const express = require('express')
const ProductService = require('../services/product.service');

const router = express.Router()

const service = new ProductService()

router.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params
    const product = await service.findByName(name)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
