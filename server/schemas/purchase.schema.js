const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const ValidationError = require('../errors/ValidationError')

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
    }
    next()
})

module.exports = PurchasesSchema