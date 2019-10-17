const express = require('express')
const router = express.Router()
const User = require('../models/User');
import { createUser } from '../controllers/user'

router.get('/', (req, res) => {

  User.find()
    .then(data => {
      if (data !== null) {
        return res.status(200).json({ success: true, data: data.map(u => u.username) })
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(400).json({ success: false, error: 'probleme while accessing the db' })
    })
})

module.exports = router
