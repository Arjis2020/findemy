const express = require('express')
const router = express.Router()
const { createOrder, verifyOrder, getPaymentMethods, verifyVPA, generateQR } = require('../controllers/payment.controller')
const cacheMiddleware = require('../middlewares/cache.middleware')
const paymentMiddleware = require('../middlewares/payment.middleware')

router.get('/paymentMethods', cacheMiddleware, getPaymentMethods)
router.post('/createOrder', createOrder)
router.post('/verifyOrder', paymentMiddleware, verifyOrder)
router.post('/verifyVpa', verifyVPA)
router.post('/generateQR', cacheMiddleware, generateQR)

module.exports = router