const express = require('express')
const { login, signup, getAllUsers, authorize, logout, forgotPassword, resetPassword } = require('../controllers/user.controller')
const authenticate = require('../middlewares/auth.middleware')
const checkToken = require('../middlewares/checkToken.middleware')
const router = express.Router()

router.get('/', getAllUsers)
router.post('/authorize', authenticate, authorize)
router.post('/login', login)
router.post('/signup', signup)
router.post('/forgotPassword', forgotPassword)
router.post('/logout', authenticate, logout)
router.put('/resetPassword', checkToken, resetPassword)

module.exports = router