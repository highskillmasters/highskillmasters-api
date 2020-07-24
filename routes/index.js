const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    title: 'High Skill Masters API',
  })
})

router.post('/subscribe', (req, res) => {
  res.send({
    message: 'Email is successfully subscribed.',
    email: req.body.email,
  })
})

module.exports = router
