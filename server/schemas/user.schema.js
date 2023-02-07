const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { v4: uuidv4 } = require('uuid')
const ValidationError = require('../errors/ValidationError')
const Users = require('../models/user.model')

const UsersSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
}, {
    timestamps: true
})

UsersSchema.index({ email: 1 }, {
    unique: true
})

module.exports = UsersSchema