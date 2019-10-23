import { createByUrl } from '../controllers/url'
import User from '../models/User'
import Room from '../models/Room'

export const initSocketUrl = (io, socket) => {

  socket.on('url', ({ username, socketId, roomId }) => {

    (async () => {
      const users = await User.find()
      const rooms = await Room.find()
      console.log(users, rooms)

      createByUrl(username, socketId, roomId, (error, data) => {
        if (error) {
          console.log(error)
          return
        }
        socket.username = username
        socket.roomId = null
        socket.join('lobby')
        io.to('lobby').emit('auth', { username, users, rooms })

        if (data.newRoom) {
          socket.roomId = data.roomId
          io.to('lobby').emit('created_room', data)
          socket.join(socket.roomId)
        }
        if (data.roomId && !data.newRoom) {
          socket.roomId = data.roomId
          io.to('lobby').emit('joined_room', { username, roomId })
          socket.join(socket.roomId)
          io.to(socket.roomId).emit('joined_room', { username, roomId })
        }
        socket.leave('lobby')
      })
    })()
  })

}
