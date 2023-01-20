const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const PurchasesSchema = new Schema({
    course_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    created_at: {
        type: String,
        default: uuidv4
    }
})

module.exports = PurchasesSchema