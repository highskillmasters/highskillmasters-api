const log = {
  info: (title, text) => {
    const datetime = new Date()
    console.info(`[${datetime.toISOString()}][${title}] ${text}`)
  },
}

module.exports = log
