import { Router } from 'express'
import Room from '../models/Room';
import HttpStatus from 'http-status-codes'

const router = new Router()

router.get('/', (req, res) => {
  Room.find()
    .then(data => {
      if (data !== null) {
        return res.status(HttpStatus.OK).json({ success: true, data })
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, error: 'probleme while accessing the db' })
    })
})

module.exports = router
