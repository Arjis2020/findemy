const { model } = require('mongoose')
const InstructorSchema = require('../schemas/instructor.schema')

const Instructor = model('Instructors', InstructorSchema)

module.exports = Instructor