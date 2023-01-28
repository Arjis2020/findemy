const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const ValidationError = require('../errors/ValidationError')
const Cart = require('../models/cart.model')
const Courses = require('../models/course.model')

const PurchasesSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true
})

PurchasesSchema.pre('insertMany', async function (next, docs) {
    const Purchases = require('../models/purchase.model')
    for await (const doc of docs) {
        const purchase = await Purchases.findOne({
            course_id: doc.course_id,
            user_id: doc.user_id
        })
        if (purchase?._id) {
            throw new ValidationError('One of the courses were already purchased')
        }
        const course = await Courses.findById(doc.course_id)
        if (!course._id) {
            throw new ValidationError('No courses found with the given course id')
        }
    }
    await Cart.deleteMany({
        course_id: {
            $in: docs.map(doc => doc.course_id)
        },
        user_id: docs[0].user_id
    })
    next()
})

module.exports = PurchasesSchema