const debug = require('debug')('∆:socket game')
const Highscore = require('../models/Highscore')
const { playGame, stopGame, setHighscore, setWins } = require('../controllers/game/game')

const initSocketGame = (io, socket) => {
  socket.on('play_game', ({ roomId }) => {
    playGame(roomId, (error, data) => {
      if (error === null) {
        io.to(roomId).emit('play_game', roomId)
        io.to('lobby').emit('play_game', roomId)
      }
    })
  })

  socket.on('stop_game', ({ roomId, solo, score }) => {
    debug(`stop game ${roomId}`)
    if (!solo) {
      stopGame(roomId, (error, data) => {
        if (error === null) {
          io.to(roomId).emit('stop_game', roomId)
          io.to('lobby').emit('stop_game', roomId)
        }
        setWins(socket.username, roomId, err => {
          io.to(roomId).emit('add_win', socket.username)
          return
        })
      })
    }
    setHighscore(socket.username, score, async (err, newHighscore) => {
      if (!newHighscore) {
        return
      }
      const highscores = await Highscore.find({})
      io.emit('highscore', highscores)
    })
  })

  socket.on('get_pieces', ({ solo, roomId }) => {
    const pieces = [1, 1, 1, 1, 18, ...Array(5).fill(0).map(() => Math.floor(Math.random() * 19))]
    if (solo) {
      socket.emit('get_pieces', pieces)
      return
    }
    io.to(roomId).emit('get_pieces', pieces)
  })

  socket.on('spectrum', spectrum => {
    io.to(socket.roomId).emit('spectrum', { username: socket.username, spectrum })
  })

  socket.on('blockLines', lines => {
    socket.to(socket.roomId).emit('blockLines', lines)
  })

  socket.on('gameOver', index => {
    socket.to(socket.roomId).emit('gameOver', index)
  })
}

module.exports = { initSocketGame }
