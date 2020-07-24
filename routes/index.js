const express = require('express')
const router = express.Router()

const Member = require('./members/model')

router.get('/', (req, res) => {
  res.send({
    title: 'High Skill Masters API',
  })
})

router.get('/subscribe', (req, res) => {
  res.send({
    message: 'Subscribe',
  })
})

router.post('/subscribe', async (req, res) => {
  await Member.create({
    email: req.body.email,
  })

  const response = {
    message: 'Email is successfully subscribed',
    email: req.body.email,
  }

  const datetime = new Date()
  console.info(`[SUBSCRIBER][${datetime.toISOString()}] ${req.body.email}`)
  res.send(response)
})

module.exports = router
