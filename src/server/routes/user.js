const express = require('express')
const router = express.Router()
const User = require('../models/User');


router.post('/register', (req, res) => {
  const { username } = req.body
  User.findOne({
    username
  })
    .then(user => {
      return res.status(400).json({ isValid: false, errors: 'username already exists' })
    })
    .catch(err => {
      return res.status(200).json({ isValid: true, username })
    })
})

module.exports = router