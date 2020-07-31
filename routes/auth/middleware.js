const auth = {
  index: (req, res) => {
    res.status(200).send({
      title: 'Auth API'
    })
  },

  hasApiKey: (req, res, next) => {
    const apiKey = req.query.api_key
    const isCorrect = apiKey === process.env.PLATFORM_API_KEY

    if (!isCorrect) {
      res.status(401).send({
        message: 'Authorization failed'
      })
    } else {
      next()
    }
  },

  login: (req, res) => {
    const apiKey = req.query.api_key || req.body.apiKey
    const isCorrect = apiKey === process.env.PLATFORM_API_KEY

    if (!isCorrect) {
      res.status(400).send({
        message: 'Login failed'
      })
    } else {
      res.status(200).send({
        message: 'Login successful',
        apiKey: apiKey
      })
    }
  }
}

module.exports = auth
