const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid')
// const CoursesSchema = require('./courses.schema')
const Schema = mongoose.Schema

const ParentCategorySchema = new Schema({
    title: String
}, {
    timestamps: true
})

module.exports = ParentCategorySchema