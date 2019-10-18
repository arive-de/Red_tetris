import { createUser } from '../controllers/user'

export const initSocketAuth = (io, socket) => {

  socket.on('auth', username => {
    createUser(username, socket.id, error => {
      if (error) {
        socket.emit('auth', { error })
      }
      else {
        socket.join('lobby')
        io.to('lobby').emit('auth', { username })
      }
    })
  })
}
