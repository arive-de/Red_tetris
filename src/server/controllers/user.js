const User = require('../models/User');
const Room = require('../models/Room');

const createUser = (username, socketId, cb) => {
  
  const newUser = new User({
    socketId,
    username,
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
          cb()
        })
        .catch(err => {
          console.log(err)
          cb('can\'t store the user in db')
        })
      }
      else {
        return cb('user already exists')
      }
    })
  .catch(err => {
    console.log(err)
    cb('can\'t store the user in db')
  })
}

const deleteUser = (username, roomId, cb) => {
  User.remove({ username })
  .then(user => {
    console.log(`user ${user.username} removed from db`)
    if (roomId !== null) {
      Room.findOne({ roomId })
      .then(room => {
        room.players = room.players.filter(u => u !== username)
        if (room.players.length === 0) {
          Room.remove({ roomId })
          .then(() => {
            console.log(`room ${roomId} deleted because the user ${username} was the last player`)
            return cb()
          })
          .catch(err => {
            console.log(err)
            cb('something wrong happen while accesssing the db')
          })
        }
        room.save()
        .then(() => {
          console.log(`the user ${username} has been deleted from the room ${roomId}`)
          return cb()
        })
        .catch(err => {
          console.log(err)
          cb('something wrong happen while accesssing the db')
        })
      })
    }
    console.log(`the room ${roomId} has not been found in db}`)
    cb('can not found room in db')
  })
  .catch(err => {
    console.log(err)
    cb('something wrong happen while accesssing the db')
  })
}

module.exports = { createUser, deleteUser }
