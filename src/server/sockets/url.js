import { createByUrl } from '../controllers/url'
import User from '../models/User'
import Room from '../models/Room'

export const initSocketUrl = (io, socket) => {

  socket.on('url', ({ username, socketId, roomId }) => {

    createByUrl(username, socketId, roomId, async (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      socket.username = username
      socket.roomId = null
      socket.join('lobby')
      io.to('lobby').emit('auth', { username })

      if (data.newRoom) {
        socket.roomId = data.roomId
        io.to('lobby').emit('created_room', data)
        socket.join(socket.roomId)
      }
      if (data.roomId && !data.newRoom) {
        socket.roomId = data.roomId
        io.to('lobby').emit('joined_room', { username, roomId })
        io.to(data.roomId).emit('joined_room', data)
        socket.join(socket.roomId)
      }
      socket.leave('lobby')
    })
  })

}
