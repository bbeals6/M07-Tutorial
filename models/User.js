const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minlength: [6, 'Minimum password length is 6 characters.'],
  },
})

userSchema.post('save', function (doc, next) {
  console.log('new user saved', doc)

  next();
})

userSchema.pre('save', async function () {
  console.log('user about to be saved')
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('user', userSchema)

module.exports = User
