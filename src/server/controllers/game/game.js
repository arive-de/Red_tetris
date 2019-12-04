const debug = require('debug')('∆:controller game')
const Room = require('../../models/Room');

const playGame = (roomId, cb) => {
  Room.findOne({ roomId })
    .then(room => {
      room.running = true
      room.save()
      .then(r => {
        cb(null, { roomId })
      })
    })
    .catch(err => {
      cb(err.message)
    })
}

const stopGame = (roomId, cb) => {
  Room.findOne({ roomId })
    .then(room => {
      room.running = false
      room.save()
      .then(r => {
        cb(null, { roomId })
      })
    })
    .catch(err => {
      cb(err.message)
    })
}

module.exports = { playGame, stopGame }
