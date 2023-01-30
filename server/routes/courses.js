const express = require('express')
const { getAllCourses, getCourseBySlug, search, addOne, searchByCategory } = require('../controllers/course.controller')
const router = express.Router()

router.get('/all', getAllCourses)
router.get('/:slug', getCourseBySlug)
router.get('/', search)
router.get('/topic/:category', searchByCategory)
router.post('/add', addOne)

module.exports = router