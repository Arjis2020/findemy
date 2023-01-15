const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { v4: uuidv4 } = require('uuid')

const UsersSchema = new Schema({
    id: {
        type: String,
        default: uuidv4
    },
    name: String,
    email: String,
    password: String,
    created_at: {
        type: String,
        default: Date.now
    }
})

module.exports = UsersSchema