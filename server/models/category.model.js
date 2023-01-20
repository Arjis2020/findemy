const { model } = require('mongoose')
const CategorySchema = require('../schemas/category.schema')

const Category = model('Categories', CategorySchema)

module.exports = Category