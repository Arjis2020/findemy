const database = require('../../database')
const categories = require('../../data/categories')
const Category = require('../../models/category.model')

const main = async () => {
    const _categories = categories.map(cat => ({ title: cat }))
    const inserted = await Category.insertMany(_categories)
    console.log(inserted)
}

database.init(main)