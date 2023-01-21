const { model } = require('mongoose')
const InstructorSchema = require('../schemas/instructor.schema')

const Instructor = model('instructors', InstructorSchema)

module.exports = Instructor