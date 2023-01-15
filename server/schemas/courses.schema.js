const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Schema = mongoose.Schema

const CoursesSchema = new Schema({
    id: {
        type: String,
        default: uuidv4
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    price: Number
})

module.exports = CoursesSchema