const Member = require('../members/model')

const index = (req, res) => {
  res.send({ title: 'High Skill Masters API' })
}

const createMember = async (req, res) => {
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
}

module.exports = { index, createMember }
