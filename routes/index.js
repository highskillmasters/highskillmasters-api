const express = require('express')
const router = express.Router()

const Member = require('./members/model')

router.get('/', (req, res) => {
  res.send({
    title: 'High Skill Masters API',
  })
})

module.exports = router
