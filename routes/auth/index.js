const express = require('express')
const router = express.Router()

const auth = require('./middleware')

router.post('/login', auth.login)

module.exports = router
