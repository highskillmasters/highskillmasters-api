const express = require('express')
const router = express.Router()

const Member = require('./model')
const Token = require('../tokens/model')

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
  const emailAddress = req.body.email
  const member = await Member.findOne({ email: emailAddress })

  if (member) {
    // Response if member email is duplicate
    log.info('MEMBER_SUBSCRIBE_FAILED', emailAddress)
    res.status(400).send({
      message: 'Subscribe email failed because already subscribed',
      email: emailAddress,
    })
  } else {
    try {
      // Response if member email is new
      await Member.create({
        email: emailAddress,
      })
      const emailData = {
        to: emailAddress,
        subject: 'Verify email on High Skill Masters',
        text: 'Please verify your email. Thank you!',
      }
      // Send email to new member
      const sendEmailResult = email.send(emailData)

      if (!sendEmailResult) {
        throw new Error('Send email failed')
      } else {
        log.info('MEMBER_SUBSCRIBE_SUCCESS', emailAddress)
        res.status(400).send({
          message: 'Subscribe email success',
          email: emailAddress,
          emailData: emailData,
        })
      }
    } catch (error) {
      // Response if member email is failed
      log.info('MEMBER_SUBSCRIBE_FAILED', emailAddress)
      res.status(500).send({
        message: 'Subscribe email failed',
        email: emailAddress,
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

router.get('/verify', async (req, res) => {
  const emailAddress = req.params.email
  const verifyCode = req.params.verify_code

  const member = await member.findOne({ email: emailAddress })

  if (!member) {
    // Response if member email is not found
    log.info('MEMBER_VERIFY_FAILED', emailAddress)
    res.status(400).send({
      message: 'Member email is not found',
    })
  } else {
    // Response if member email is found
    const result = await Member.findOneAndUpdate(
      {
        email: emailAddress,
      },
      {
        isVerified: true,
      },
      {
        select: '-password -salt',
      }
    )

    const emailData = {
      to: emailAddress,
      subject: 'Your email is verified on High Skill Masters',
      text: 'Congratulations! Your email is now verified. Thank you!',
    }
    // email.send(emailData)

    log.info('MEMBER_VERIFIED', emailAddress)
    res.status(200).send({
      message: 'Verify member email success',
      email: emailAddress,
      result: result,
    })
  }
})

module.exports = router
