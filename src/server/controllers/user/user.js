const debug = require('debug')('∆:controller user')
const User = require('../../models/User')
const Room = require('../../models/Room')


const createUser = (username, socketId, cb) => {
  const newUser = new User({
    socketId,
    username,
  })
  User.findOne({
    username,
  })
    .then(user => {
      debug(user)
      if (!user) {
        newUser.save()
        .then(user => {
          debug(`new user ${user.username} added to db`)
          cb()
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
    debug(user)
    if (user.deletedCount ===  0) {
      return cb('user doesn\'t exist in db')
    }
    debug(`user ${user.username} removed from db`)
    if (roomId !== null) {
      Room.findOne({ roomId })
      .then(room => {
        const newLeaderBoard = [...room.leaderBoard]
        newLeaderBoard.splice(room.players.indexOf(username), 1)
        room.leaderBoard = newLeaderBoard
        room.players = room.players.filter(u => u !== username)
        if (room.players.length === 0) {
          return Room.deleteOne({ roomId })
          .then(() => {
            debug(`room ${roomId} deleted because the user ${username} was the last player`)
            return cb()
          })
        }
        Room.updateOne({ _id: room._id }, { $set: { players: room.players, leaderBoard: room.leaderBoard } })
        .then(() => {
          debug(`the user ${username} has been deleted from the room ${roomId}`)
          return cb()
        })
      })
    }
    else {
      debug(`the room ${roomId} has not been found in db`)
      return cb('can not found room in db')
    }
  })
  .catch(err => {
    cb('something wrong happen while accesssing the db')
  })
}

module.exports = { createUser, deleteUser }
