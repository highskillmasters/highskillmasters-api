const crypto = require('crypto')

const random = {
  generate: () => {
    return crypto.randomBytes(16).toString('hex')
  },
}

module.exports = random
