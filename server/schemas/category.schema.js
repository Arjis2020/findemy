const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid')
// const CoursesSchema = require('./courses.schema')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    title: String
}, {
    timestamps: true
})

module.exports = CategorySchema