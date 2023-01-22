const express = require('express')
const { getCart, removeFromCart, addToCart } = require('../controllers/cart.controller')
const authenticate = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/', authenticate, getCart)
router.delete('/remove/:cid', authenticate, removeFromCart)
router.post('/add', authenticate, addToCart)

module.exports = router