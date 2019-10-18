import { createUser } from '../controllers/user'

export const initSocketAuth = (io, socket) => {

  socket.on('auth', username => {
    createUser(username, socket.id, error => {
      if (error) {
        socket.emit('auth', { error })
      }
      else {
        socket.username = username
        socket.roomId = null
        socket.join('lobby')
        io.to('lobby').emit('auth', { username })
      }
    })
  })
}
