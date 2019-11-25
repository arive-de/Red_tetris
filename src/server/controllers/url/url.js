const debug = require('debug')('∆:controller url')
const User = require('../../models/User');
const Room = require('../../models/Room');

const createByUrl = (username, roomId, cb) => {

  const newUser = new User({
    username,
  })

  const newRoom = new Room({
    players: [username],
    roomId,
    type: 'Classic',
    running: false,
    leaderBoard: [0],
  })

  User.findOne({
    username,
  })
    .then(user => {
      if (!user) {
        newUser.save()
        .then(user => {
          Room.findOne({
            roomId,
          })
          .then(room => {
            if (!room) {
              newRoom.save()
              .then(data => {
                data.newRoom = true
                cb(null, data)
              })
              .catch(err => {
                cb('can\'t store the new room in db')
              })
            }
            else {
              if (room.players.length === 4) {
                const roomFull = true
                return cb(null, { username, roomFull })
              }
              // if (room.running === true) {
              //   // implementer un systeme plus tard
              // }
              room.leaderBoard.push(0)
              room.players.push(username)
              room.save()
              .then(r => {
                cb(null, { roomId, username })
              })
              .catch(err => {
                cb('can\'t update room in db')
              })
            }
          })
        })
        .catch(err => {
          cb('can\'t store the user in db')
        })
      }
      else {
        return cb('username already exists')
      }
    })
  .catch(err => {
    cb(err)
  })
}

module.exports = { createByUrl }
