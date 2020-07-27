const express = require('express')
const router = express.Router()

const auth = require('../auth/middleware')
const tokens = require('./middleware')

router.get('/', auth.isAuthorized, tokens.get)

module.exports = router
