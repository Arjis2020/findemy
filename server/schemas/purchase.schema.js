const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const PurchasesSchema = new Schema({
    course_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
}, {
    timestamps: true
})

module.exports = PurchasesSchema