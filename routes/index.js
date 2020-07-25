const express = require('express')
const router = express.Router()

const { index, createMember } = require('./controller')

router.get('/', index)
router.get('/', createMember)

module.exports = router
