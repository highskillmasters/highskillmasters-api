const mailgun = require('mailgun-js')

const log = require('./log')

const email = {
  /**
   * https://app.mailgun.com/app/sending/domains/mg.highskillmasters.com
   * Here’s the basic code you need. Plug in your API info from above and modify the from address, to address, and other content to give Mailgun a good old test drive.
   */
  send: (emailData) => {
    try {
      const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      })

      const data = {
        from: emailData.from || process.env.EMAIL_DEFAULT_FROM,
        to: emailData.to || process.env.EMAIL_DEFAULT_TO,
        subject: emailData.subject,
        text: emailData.text,
      }

      // mg.messages().send(data, (error, body) => {
      //   if (error) return false
      //   log.info('MAILGUN_SEND_EMAIL', `${emailData.to} ${body.message}`)
      // })

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  },
}

module.exports = email
