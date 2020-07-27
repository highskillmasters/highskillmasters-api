const Token = require('./model')

const tokens = {
  get: async (req, res) => {
    const foundTokens = await Token.find()

    res.status(200).send({
      message: 'Get all tokens',
      data: foundTokens,
    })
  },
}

module.exports = tokens
