const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid')
// const CoursesSchema = require('./courses.schema')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    title: String,
    parent_category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    students: Number
}, {
    timestamps: true
})

module.exports = CategorySchema