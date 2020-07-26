const express = require('express')
const router = express.Router()

const members = require('./members/middleware')

router.get('/', (req, res) => {
  res.send({
    title: 'High Skill Masters API',
  })
})

router.post('/subscribe', members.subscribe)

module.exports = router
