const { model } = require('mongoose')
const CoursesSchema = require('../schemas/course.schema')

const Courses = model('Courses', CoursesSchema)

module.exports = Courses