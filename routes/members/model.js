const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const MemberSchema = Schema(
  {
    email: {
      type: String,
      index: true,
      unique: true,
      required: [true, 'Email is required'],
      min: [2, 'Email is too short'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

MemberSchema.plugin(AutoIncrement, {
  id: 'members_id_counter',
  inc_field: 'id',
})

const Member = mongoose.model('Member', MemberSchema)

module.exports = Member
