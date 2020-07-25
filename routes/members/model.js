const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const MemberSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      min: [2, 'Email is too short'],
    },
  },
  {
    timestamps: true,
  }
)

MemberSchema.plugin(AutoIncrement, {
  id: 'memberss_counter',
  inc_field: 'id',
})

const Member = mongoose.model('Member', MemberSchema)

module.exports = Member
