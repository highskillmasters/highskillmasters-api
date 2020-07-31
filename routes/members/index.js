const express = require('express')
const router = express.Router()

const auth = require('../auth/middleware')
const members = require('./middleware')

router.get('/', auth.hasApiKey, members.get)
router.post('/subscribe', members.subscribe)
router.get('/unsubscribe', members.unsubscribe)
router.get('/verify', members.verify)

module.exports = router
