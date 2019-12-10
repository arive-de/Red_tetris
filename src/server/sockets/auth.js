const debug = require('debug')('∆:socket auth')
const { createUser } = require('../controllers/user/user')
const User = require('../models/User')
const Room = require('../models/Room')
const Highscore = require('../models/Highscore')
const os = require('os')

const initSocketAuth = (io, socket) => {

  socket.on('auth', username => {
    createUser(username, socket.id, error => {
      if (error) {
        socket.emit('auth', { error })
      }
      else {
        debug(`set socket username ${username}`)
        socket.username = username
        socket.roomId = null
        socket.join('lobby')
        io.to('lobby').emit('auth', { username, hostname: os.hostname() })
      }
    })
  })

  socket.on('update', async () => {
    const users = await User.find()
    const rooms = await Room.find()
    socket.emit('update', { users: users.map(u => u.username),
                            rooms: rooms.map(r => ({ roomId: r.roomId,
                                                     type: r.type,
                                                     players: r.players,
                                                     running: r.running,
                                                    leaderBoard: r.leaderBoard })),
                          })
  })

  socket.on('highscore', async () => {
    const highscores = await Highscore.find()
    socket.emit('highscore', highscores.map(h => ({
      username: h.username,
      score: h.score,
    })))
  })
}

module.exports = { initSocketAuth }
