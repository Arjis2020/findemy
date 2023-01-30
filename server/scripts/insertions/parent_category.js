const ParentCategory = require("../../models/parent_category.model")
const database = require('../../database')

database.init(main)
const pCat = [
    { title: 'Development' },
    { title: 'Business' },
    { title: 'IT and Software' },
    { title: 'Design' }
]

function main() {
    ParentCategory.insertMany(pCat).then((docs) => {
        console.log(docs)
        console.log("Done")
        process.exit(0)
    })
}