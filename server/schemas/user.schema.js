const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { v4: uuidv4 } = require('uuid')
const ValidationError = require('../errors/ValidationError')
const Users = require('../models/user.model')

const UsersSchema = new Schema({
    name: String,
    email: String,
    password: String
}, {
    timestamps: true
})

UsersSchema.index({ email: 1 }, {
    unique: true
})

UsersSchema.pre('save', async function (next) {
    const doc = await Users.find({ email: this.email })
    if (doc) {
        throw new ValidationError('User already exists')
    }
    next()
})

module.exports = UsersSchema