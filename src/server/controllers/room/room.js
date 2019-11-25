const debug = require('debug')('∆:controller room')
const Room = require('../../models/Room');

const genRoomId = async () => {
  let roomIds = await Room.find({})
  roomIds = roomIds.map(r => r.roomId)
  debug(roomIds)
  if (roomIds.length === 0) {
    debug('no room yet')
    return (String.fromCharCode(Math.floor(Math.random() * 26) + 97,
                                Math.floor(Math.random() * 26) + 97,
                                Math.floor(Math.random() * 10) + 48,
                                Math.floor(Math.random() * 10) + 48))
  }
  let roomId = roomIds[0]
  while (roomIds.indexOf(roomId) >= 0) {
    roomId = String.fromCharCode(Math.floor(Math.random() * 26) + 97,
                                 Math.floor(Math.random() * 26) + 97,
                                 Math.floor(Math.random() * 10) + 48,
                                 Math.floor(Math.random() * 10) + 48)
    debug(roomId)
  }
  return roomId
}

const createRoom = async (username, type, cb) => {

  const newRoom = new Room({
    players: [username],
    roomId: await genRoomId(),
    type,
    running: false,
    leaderBoard: [0],
  })

  newRoom.save()
    .then(data => {
      debug(data)
      debug(`new room added by ${username} to db`)
      cb(null, data)
    })
    .catch(err => {
      debug(err)
      cb('can\'t store the new room in db')
    })

}

const joinRoom = (username, roomId, cb) => {
  debug('roomid', roomId)
  Room.findOne({ roomId })
    .then(room => {
      debug('room found', room.players)
      if (room.players.length === 4) {
        throw new Error('room is full')
      }
      room.players.push(username)
      room.leaderBoard.push(0)
      room.save()
      .then(r => {
        debug(`user ${username} join the room ${r.roomId} to db`)
        cb(null, { roomId, username })
      })
      .catch(err => {
        debug(err)
        cb('can\'t update room in db')
      })
    })
    .catch(err => {
      cb(err.message)
    })

}

const leaveRoom = (username, roomId, cb) => {
  Room.findOne({ roomId })
    .then(room => {
      // debug('room found', room.players)
      room.leaderBoard = room.leaderBoard.splice(room.players.indexOf(username), 1)
      room.players = room.players.filter(u => u !== username)
      if (room.players.length === 0) {
        Room.deleteOne({ roomId })
        .then(r => {
          // debug(`user ${username} leave the room ${r.roomId} to db and delete the room`)
          return cb(null, { roomId, username })
        })
        .catch(err => {
          // debug(err)
          cb('can\'t remove the empty room from db')
        })
      }
      else {
        room.save()
        .then(r => {
          debug(`user ${username} leave the room ${r.roomId} to db`)
          cb(null, { roomId, username })
        })
        .catch(err => {
          debug(err)
          cb('can\'t update room in db')
        })
      }
    })
    .catch(err => {
      cb(err.message)
    })

}

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

module.exports = { createRoom, joinRoom, leaveRoom, playGame }
