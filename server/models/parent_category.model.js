const { model } = require('mongoose')
const ParentCategorySchema = require('../schemas/parent_category.schema')

const ParentCategory = model('parent_categories', ParentCategorySchema)

module.exports = ParentCategory