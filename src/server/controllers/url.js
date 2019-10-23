const User = require('../models/User');
const Room = require('../models/Room');

const createByUrl = (username, socketId, roomId, cb) => {

  const newUser = new User({
    socketId,
    username,
  })

  const newRoom = new Room({
    players: [username],
    roomId,
    type: 'Classic',
    running: false,
  })

  User.findOne({
    username,
  })
    .then(user => {
      console.log(user)
      if (!user) {
        newUser.save()
        .then(user => {
          console.log(`new user ${user.username} added to db`)
          Room.findOne({
            roomId,
          })
          .then(room => {
            console.log(room)
            if (!room) {
              newRoom.save()
              .then(data => {
                console.log(`new room ${roomId} added by ${username} to db`)
                data.newRoom = true
                cb(null, data)
              })
              .catch(err => {
                console.log(err)
                cb('can\'t store the new room in db')
              })
            }
            else {
              if (room.players.length === 4) {
                return cb(null, { username })
              }
              // if (room.running === true) {
              //   // implementer un systeme plus tard
              // }
              room.players.push(username)
              room.save()
              .then(r => {
                console.log(`user ${username} join the room ${r.roomId} to db`)
                cb(null, { roomId, username })
              })
              .catch(err => {
                console.log(err)
                cb('can\'t update room in db')
              })
            }
          })
        })
        .catch(err => {
          console.log(err)
          cb('can\'t store the user in db')
        })
      }
      else {
        return cb('username already exists')
      }
    })
  .catch(err => {
    console.log(err)
    cb('can\'t store the user in db')
  })
}

module.exports = { createByUrl }
