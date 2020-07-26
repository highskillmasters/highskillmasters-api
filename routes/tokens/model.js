const mongoose = require('../../config/mongoose')
const Schema = mongoose.Schema

const TokenSchema = Schema(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Member',
    },
    code: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Token = mongoose.model('Token', TokenSchema)

module.exports = Token
