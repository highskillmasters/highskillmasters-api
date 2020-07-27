const crypto = require('crypto')

const Member = require('./model')
const Token = require('../tokens/model')

const email = require('../../utils/email')
const log = require('../../utils/log')

const members = {
  get: async (req, res) => {
    const foundMembers = await Member.find()

    res.status(200).send({
      message: 'Get all members',
      data: foundMembers,
    })
  },

  subscribe: async (req, res) => {
    const emailAddress = req.body.email
    const foundMember = await Member.findOne({ email: emailAddress })

    if (foundMember) {
      // Response if member email is duplicate
      log.info('MEMBER_SUBSCRIBE_FAILED', emailAddress)
      res.status(400).send({
        message: 'Subscribe email failed because already subscribed',
        email: emailAddress,
      })
    } else {
      try {
        // Response if member email is new
        const newMember = await Member.create({
          email: emailAddress,
        })
        const newVerifyCode = await Token.create({
          memberId: newMember._id,
          code:
            crypto.randomBytes(16).toString('hex') ||
            'abcdefghijklmnopqrstuvwxyz',
        })
        // Compose email
        const emailData = {
          to: emailAddress,
          subject: 'Verify your email on High Skill Masters',
          text: `Hello,
        
Please verify your email by clicking this link:
${process.env.DOMAIN_URL}/verify?email=${emailAddress}&code=${newVerifyCode.code}

Thank you,
High Skill Masters`,
        }

        // Send email to new member
        const sendEmailResult = email.send(emailData)

        if (!sendEmailResult) {
          throw new Error('Send email failed')
        } else {
          log.info('MEMBER_SUBSCRIBE_SUCCESS', emailAddress)
          res.status(200).send({
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
  },

  unsubscribe: (req, res) => {
    res.status(200).send({
      message: 'Unsubscribe member email',
    })
  },

  verify: async (req, res) => {
    const emailAddress = req.query.email
    const verifyCode = req.query.code
    const member = await Member.findOne({ email: emailAddress })

    if (!member) {
      // Response if member email is not found
      log.info('MEMBER_VERIFY_FAILED', emailAddress)
      res.status(400).send({
        message: 'Verify member failed because email is not found',
        email: emailAddress,
      })
    } else {
      if (member.isVerified) {
        // Response if member email is already verified
        log.info('MEMBER_VERIFIED_ALREADY', emailAddress)
        res.status(400).send({
          message: 'Verify member stopped because already verified',
          email: emailAddress,
        })
      } else {
        // Response if member email is found
        // Find the token by verify code
        const token = await Token.findOne({
          code: verifyCode,
        })

        if (!token && token.isUsed && token.memberId !== member._id) {
          // Response if token is not found
          // Response if token is already used
          // Response if member _id in token is incorrect / Email doesn't match
          log.info('MEMBER_VERIFY_FAILED', emailAddress)
          res.status(200).send({
            message:
              'Verify code is invalid, already used, or does not match with the email',
            email: emailAddress,
            code: verifyCode,
          })
        } else {
          // Response if token is found
          // Response if token is not used
          // Response if member _id in token is correct / Email is match

          // Update isVerified in member
          await Member.findOneAndUpdate(
            { email: emailAddress },
            { isVerified: true },
            { new: true, select: '-password -salt' }
          )
          // Update isUsed in token
          await Token.findOneAndUpdate(
            { code: token.code },
            { isUsed: true },
            { new: true }
          )

          // Compose email
          const emailData = {
            to: emailAddress,
            subject: 'Your email is verified on High Skill Masters',
            text: `Hello,

Congratulations! Your email is now verified on High Skill Masters.

Thank you for subscribing.

Cheers,
High Skill Masters`,
          }
          // Send email to verified member
          email.send(emailData)

          log.info('MEMBER_VERIFIED', emailAddress)
          res.status(200).send({
            message: 'Verify member email succeeded',
            email: emailAddress,
            code: verifyCode,
          })
        }
      }
    }
  },
}

module.exports = members
