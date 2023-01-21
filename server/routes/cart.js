const express = require('express')
const { getCart } = require('../controllers/cart.controller')
const authenticate = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/', authenticate, getCart)

module.exports = router