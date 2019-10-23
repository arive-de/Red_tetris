import { Router } from 'express'
import User from '../models/User'
import HttpStatus from 'http-status-codes'

const router = new Router()
router.get('/', (req, res) => {

  User.find()
    .then(data => {
      if (data !== null) {
        return res.status(HttpStatus.OK).json({ success: true, data: data.map(u => u.username) })
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, error: 'probleme while accessing the db' })
    })
})

module.exports = router
