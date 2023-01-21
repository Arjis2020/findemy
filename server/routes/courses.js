const express = require('express')
const { getAllCourses, getCourseBySlug, search, addOne, addToCart } = require('../controllers/course.controller')
const authenticate = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/all', getAllCourses)
router.get('/:slug', getCourseBySlug)
router.get('/search', search)
router.post('/add', addOne)
router.post('/addToCart', authenticate, addToCart)

module.exports = router