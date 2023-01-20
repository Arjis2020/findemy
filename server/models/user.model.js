const { model } = require('mongoose')
const UsersSchema = require('../schemas/user.schema')

const Users = model('Users', UsersSchema)

module.exports = Users