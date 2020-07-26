const express = require('express')
const router = express.Router()

const Member = require('./model')

const email = require('../../utils/email')
const log = require('../../utils/log')

router.get('/', (req, res) => {
  res.status(200).send({
    title: 'Members API',
  })
})

router.get('/subscribe', (req, res) => {
  res.status(200).send({
    message: 'Subscribe member email',
  })
})

router.post('/subscribe', async (req, res) => {
  const member = await Member.findOne({ email: req.body.email })

  if (member) {
    // Response if member email is duplicate
    log.info('MEMBER_SUBSCRIBE_FAILED', req.body.email)
    res.status(400).send({
      message: 'Subscribe email failed because already subscribed',
      email: req.body.email,
    })
  } else {
    try {
      // Response if member email is new
      await Member.create({
        email: req.body.email,
      })
      const emailData = {
        to: req.body.email,
        subject: 'Verify email on High Skill Masters',
        text: 'Please verify your email. Thank you!',
      }
      // Send email to new member
      const sendEmailResult = email.send(emailData)

      if (!sendEmailResult) {
        throw new Error('Send email failed')
      } else {
        log.info('MEMBER_SUBSCRIBE_SUCCESS', req.body.email)
        res.status(400).send({
          message: 'Subscribe email success',
          email: req.body.email,
          emailData: emailData,
        })
      }
    } catch (error) {
      // Response if member email is failed
      log.info('MEMBER_SUBSCRIBE_FAILED', req.body.email)
      res.status(500).send({
        message: 'Subscribe email failed',
        email: req.body.email,
        error: error.message,
      })
    }
  }
})

router.get('/unsubscribe', (req, res) => {
  res.status(200).send({
    message: 'Unsubscribe member email',
  })
})

router.post('/verify', async (req, res) => {
  const emailData = {
    to: req.body.email,
    subject: 'Your email verified',
    text: 'Your email is now verified. Thank you!',
  }

  const member = await member.findOne({ email: req.body.email })

  if (!member) {
    // Response if member email is not found
    res.status(400).send({
      message: 'Email is not found',
    })
  } else {
    // Response if member email is found
    const result = await Member.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        isVerified: true,
      },
      {
        select: '-password -salt',
      }
    )

    // email.send(emailData)
    log.info('MEMBER_VERIFIED', req.body.email)
    res.status(200).send({
      message: 'Verify email success',
      email: req.body.email,
      result: result,
    })
  }
})

module.exports = router
