const { model } = require('mongoose')
const UsersSchema = require('../schemas/users.schema')

const Users = model('Users', UsersSchema)

module.exports = Users