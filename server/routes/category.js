const express = require('express')
const { getGroupedCategories } = require('../controllers/category.controller')
const router = express.Router()

router.get('/getGroupedCategories', getGroupedCategories)

module.exports = router