const express = require('express')
const router = express.Router()
const User = require('../models/User');
import { createUser } from '../controllers/user'

router.get('/', (req, res) => {

  User.find()
    .then(data => {
      if (data !== null) {
        return res.status(200).json({ success: true, data })
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(400).json({ success: false, error: 'probleme while accessing the db' })
    })
})


router.post('/register', (req, res) => {
  // console.log(req.body);
  // console.log(req)
  const { username } = req.body
  User.findOne({
    username,
  })
    .then(user => {
      console.log(user)
      if (user) {
        return res.status(400).json({ success: false, errors: 'username already exists' })
      }
      return res.status(200).json({ success: true, username })
    })
    .catch(err => {
      console.log(err)
      return res.status(400).json({ success: false, error: 'probleme while accessing the db' })
    })
})

module.exports = router
