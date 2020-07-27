const express = require('express')
const router = express.Router()

const index = require('./middleware')

router.get('/', index.get)

module.exports = router
