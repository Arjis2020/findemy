const database = require('../../database')
const { IT, Business, Design } = require('../../data/categories')
const Category = require('../../models/category.model')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const main = async () => {
    const _ITCategories = IT.map(cat => ({ title: cat.title, parent_category: cat.parent, students: getRandomInt(300000, 700000) }))
    const _BusinessCategories = Business.map(cat => ({ title: cat.title, parent_category: cat.parent, students: getRandomInt(300000, 700000) }))
    const _DesignCategories = Design.map(cat => ({ title: cat.title, parent_category: cat.parent, students: getRandomInt(300000, 700000) }))
    const _categories = [..._ITCategories, ..._BusinessCategories, ..._DesignCategories]
    const inserted = await Category.insertMany(_categories)
    console.log(inserted)
}

database.init(main)