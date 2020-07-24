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
  const newMember = {
    email: req.body.email,
  }

  await Member.create(newMember)

  res.send({
    message: 'Email is successfully subscribed',
    email: newMember.email,
  })
})

module.exports = router
