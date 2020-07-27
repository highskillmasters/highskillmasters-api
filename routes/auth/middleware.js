const auth = {
  index: (req, res) => {
    res.status(200).send({
      title: 'Auth API',
    })
  },

  isAuthorized: (req, res, next) => {
    const apiKey = req.query.api_key
    const isCorrect = apiKey === process.env.PLATFORM_API_KEY

    if (!isCorrect) {
      res.status(400).send({
        message: 'You are not authorized',
      })
    } else {
      next()
    }
  },
}

module.exports = auth
