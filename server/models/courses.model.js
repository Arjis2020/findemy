const { model } = require('mongoose')
const CoursesSchema = require('../schemas/courses.schema')

const Courses = model('Courses', CoursesSchema)

module.exports = Courses