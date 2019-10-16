const express = require('express')
const router = express.Router()
const User = require('../models/User');
import { createUser } from '../controllers/user'

router.post('/register', (req, res) => {
  console.log(req.body);
  console.log(req)
  const { username } = req.body
  User.findOne({
    username,
  })
    .then(user => {
      console.log(user)
      if (user) {
        return res.status(400).json({ isValid: false, errors: 'username already exists' })
      }
      return res.status(200).json({ isValid: true, username })
    })
    .catch(err => {
      console.log(err)
      return res.status(400).json({ isValid: false, error: 'probleme while accessing the db' })
    })
})

module.exports = router
