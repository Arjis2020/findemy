const { model } = require('mongoose')
const PurchasesSchema = require('../schemas/purchase.schema')

const Purchases = model('purchases', PurchasesSchema)

module.exports = Purchases