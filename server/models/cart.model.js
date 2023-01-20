const { model } = require('mongoose')
const CartSchema = require('../schemas/cart.schema')

const Cart = model('Cart', CartSchema)

module.exports = Cart