const { model } = require('mongoose')
const CartSchema = require('../schemas/cart.schema')

const Cart = model('cart', CartSchema)

module.exports = Cart