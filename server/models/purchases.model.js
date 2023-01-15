const { model } = require('mongoose')
const PurchasesSchema = require('../schemas/purchases.schema')

const Purchases = model('Purchases', PurchasesSchema)

module.exports = Purchases