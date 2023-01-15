const { Schema } = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const PurchasesSchema = new Schema({
    id: {
        type: String,
        default: uuidv4
    },
    course_id: String,
    user_id: String,
    created_at: {
        type: String,
        default: uuidv4
    }
})

module.exports = PurchasesSchema