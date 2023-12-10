const jwt = require('jsonwebtoken')

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

module.exports = { requireAuth }
