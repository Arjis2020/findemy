const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid')
// const CoursesSchema = require('./courses.schema')
const Schema = mongoose.Schema

const InstructorSchema = new Schema({
    name: String,
    gender: String,
    skills: [String],
    introduction: String,
    rating: Number,
    reviews: Number,
    students: Number,
    courses: Number,
    imageURL: String
})

module.exports = InstructorSchema