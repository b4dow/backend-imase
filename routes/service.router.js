const express = require('express')
const ServicesService = require('../services/service.service')

const router = express.Router()

const service = new ServicesService()

router.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params
    const servicebyName = await service.findByName(name)
    res.json(servicebyName)
  } catch (error) {
    next(error)
  }
})

module.exports = router
