const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid')
// const CoursesSchema = require('./courses.schema')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    }
}, {
    timestamps: true,
    collection: 'cart'
})

module.exports = CartSchema