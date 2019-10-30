import { createUser } from '../controllers/user/user'
import User from '../models/User'
import Room from '../models/Room'

export const initSocketAuth = (io, socket) => {

  socket.on('auth', username => {
    createUser(username, socket.id, error => {
      if (error) {
        socket.emit('auth', { error })
      }
      else {
        console.log(`set socket username ${username}`)
        socket.username = username
        socket.roomId = null
        socket.join('lobby')
        io.to('lobby').emit('auth', { username })
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
                            running: r.running })) })
  })
}
