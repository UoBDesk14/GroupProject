const mongoose = require('mongoose')
const uniqueValidatorPlugin = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

userSchema.plugin(uniqueValidatorPlugin)
module.exports = mongoose.model('User', userSchema, 'User')
