const express = require('express')
const router = express.Router()
const { createOrder, verifyOrder } = require('../controllers/payment.controller')
const paymentMiddleware = require('../middlewares/payment.middleware')

router.post('/createOrder', createOrder)
router.post('/verifyOrder', paymentMiddleware, verifyOrder)

module.exports = router