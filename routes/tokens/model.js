const mongoose = require('../../config/mongoose')
const Schema = mongoose.Schema

const TokenSchema = Schema({
  memberId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Member',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 600, // Expire in 10 minutes
  },
})

const Token = mongoose.model('Token', TokenSchema)

module.exports = Token
