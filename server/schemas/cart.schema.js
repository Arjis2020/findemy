const mongoose = require('mongoose')
const ValidationError = require('../errors/ValidationError')
const Cart = require('../models/cart.model')
const Courses = require('../models/course.model')
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

CartSchema.index({
    user_id: 1,
    course_id: 1
}, {
    unique: true
})

CartSchema.pre('save', async function (next) {
    const doc = await Courses.findById(this.course_id)
    if (!doc) {
        throw new ValidationError('Course id was not found')
    }
    next()
})

module.exports = CartSchema