const { model } = require('mongoose')
const CategorySchema = require('../schemas/category.schema')

const Category = model('categories', CategorySchema)

module.exports = Category