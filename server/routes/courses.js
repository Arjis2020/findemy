const express = require('express')
const { getAllCourses, getCourseById, search, addOne } = require('../controllers/course.controller')
const router = express.Router()

router.get('/all', getAllCourses)
router.get('/', getCourseById)
router.get('/search', search)
router.post('/add', addOne)

module.exports = router