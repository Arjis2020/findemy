const { model } = require('mongoose')
const PurchasesSchema = require('../schemas/purchase.schema')

const Purchases = model('Purchases', PurchasesSchema)

module.exports = Purchases