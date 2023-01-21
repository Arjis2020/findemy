const { model } = require('mongoose')
const UsersSchema = require('../schemas/user.schema')

const Users = model('users', UsersSchema)

module.exports = Users