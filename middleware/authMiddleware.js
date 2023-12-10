const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decoded) => {
      if (err) {
        console.log(err.message)
        res.redirect('/login')
      } else {
        console.log(decoded)
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, token) => {
      if (err) {
        res.locals.user = null
        next()
      } else {
        let user = await User.findById(token.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = { requireAuth, checkUser }
