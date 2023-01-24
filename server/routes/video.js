const express = require('express')
const { stream } = require('../controllers/video.controller')
const router = express.Router()

router.get('/stream/:vid', stream)

module.exports = router