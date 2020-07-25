const express = require('express')
const router = express.Router()

const { index, createMember } = require('./controller')

// Connect to database
require('../config/mongoose')

router.get('/', index)
router.post('/members', createMember)

module.exports = router
