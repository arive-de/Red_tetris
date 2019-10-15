const express = require('express')
const router = express.Router()
const User = require('../models/User');

router.post('/register', (req, res) => {
  console.log(req.body);
  console.log(req)
  const { username } = req.body
  User.findOne({
    username,
  })
    .then(user => {
      console.log(user)
      if (user === null) {
        return res.status(200).json({ isValid: true, username })
      }
      return res.status(400).json({ isValid: false, errors: 'username already exists' })
    })
    .catch(err => {
      console.log(err)
      return res.status(400).json({ isValid: false, error: 'probleme while accessing the db' })
    })
})

module.exports = router
