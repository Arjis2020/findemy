const { model } = require('mongoose')
const CoursesSchema = require('../schemas/course.schema')

const Courses = model('courses', CoursesSchema)

module.exports = Courses