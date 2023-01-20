const express = require('express')
const { purchase, getAllPurchases } = require('../controllers/purchase.controller')
const authenticate = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/purchase', authenticate, purchase)
router.get('/', authenticate, getAllPurchases)

module.exports = router