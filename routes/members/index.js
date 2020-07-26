const express = require('express')
const router = express.Router()

const members = require('./middleware')

router.get('/', members.index)
router.post('/subscribe', members.subscribe)
router.get('/unsubscribe', members.unsubscribe)
router.get('/verify', members.verify)

module.exports = router
