const debug = require('debug')('∆:socket game')
const { playGame, stopGame } = require('../controllers/game/game')

const initSocketGame = (io, socket) => {
  socket.on('play_game', ({ roomId }) => {
    playGame(roomId, (error, data) => {
      if (error === null) {
        io.to(roomId).emit('play_game', roomId)
        io.to('lobby').emit('play_game', roomId)
      }
    })
  })

  socket.on('stop_game', ({ roomId }) => {
    debug(`stop game ${roomId}`)
    stopGame(roomId, (error, data) => {
      if (error === null) {
        io.to(roomId).emit('stop_game', roomId)
        io.to('lobby').emit('stop_game', roomId)
      }
    })
  })

  socket.on('get_pieces', ({ solo, roomId }) => {
    const pieces = [0, 0, 0, ...Array(10).fill(0).map(() => Math.floor(Math.random() * 18))]
    if (solo) {
        return socket.emit('get_pieces', pieces)
      }
    io.to(roomId).emit('get_pieces', pieces)
  })

}

module.exports = { initSocketGame }
