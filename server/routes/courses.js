const express = require('express')
const { getAllCourses, getCourseBySlug, search, addOne } = require('../controllers/course.controller')
const router = express.Router()

router.get('/all', getAllCourses)
router.get('/:slug', getCourseBySlug)
router.get('/', search)
router.post('/add', addOne)

module.exports = router