const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid')
// const CoursesSchema = require('./courses.schema')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    course_id: Schema.Types.ObjectId
})

module.exports = CartSchema