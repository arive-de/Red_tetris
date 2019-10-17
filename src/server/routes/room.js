const express = require('express')
const router = express.Router()
const Room = require('../models/Room');

router.get('/', (req, res) => {

  Room.find()
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

module.exports = router
