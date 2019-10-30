const User = require('../../models/User');
const Room = require('../../models/Room');

const createUser = (username, socketId, cb) => {
  const newUser = new User({
    socketId,
    username,
  })
  User.findOne({
    username,
  })
    .then(user => {
      // console.log(user)
      if (!user) {
        newUser.save()
        .then(user => {
          // console.log(`new user ${user.username} added to db`)
          cb()
        })
        .catch(err => {
          return cb('can\'t store the user in db')
        })
      }
      else {
        return cb('user already exists')
      }
    })
  .catch(err => {
    return cb('can\'t store the user in db')
  })
}

const deleteUser = (username, roomId, cb) => {
  User.deleteOne({ username })
  .then(user => {
    // console.log(user)
    if (user.deletedCount ===  0) {
      return cb('user doesn\'t exist in db')
    }
    // console.log(`user ${user.username} removed from db`)
    if (roomId !== null) {
      Room.findOne({ roomId })
      .then(room => {
        room.players = room.players.filter(u => u !== username)
        if (room.players.length === 0) {
          return Room.deleteOne({ roomId })
          .then(() => {
            // console.log(`room ${roomId} deleted because the user ${username} was the last player`)
            return cb()
          })
          .catch(err => {
            return cb('something wrong happen while accesssing the db')
          })
        }
        Room.updateOne({ _id: room._id }, { $set: { players: room.players } })
        .then(() => {
          // console.log(`the user ${username} has been deleted from the room ${roomId}`)
          return cb()
        })
        .catch(err => {
          cb('something wrong happen while accesssing the db')
        })
      })
      .catch(err => {
        return cb('can\'t find the room in db')
      })
    }
    else {
      // console.log(`the room ${roomId} has not been found in db`)
      return cb('can not found room in db')
    }
  })
  .catch(err => {
    cb('something wrong happen while accesssing the db')
  })
}

module.exports = { createUser, deleteUser }
