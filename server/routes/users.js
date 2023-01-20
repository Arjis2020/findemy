const express = require('express')
const { login, signup, getAllUsers, authorize, logout } = require('../controllers/users.controller')
const authenticate = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/', getAllUsers)
router.post('/authorize', authenticate, authorize)
router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', authenticate, logout)

module.exports = router