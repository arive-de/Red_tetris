import { createByUrl } from '../controllers/url'

export const initSocketUrl = (io, socket) => {

  socket.on('url', ({ username, socketId, roomId }) => {

    createByUrl(username, socketId, roomId, (error, data) => {

      if (error) {
        console.log(error)
        return
      }

      if (data) {
        io.to('lobby').emit('auth')
      }
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
    })
  })

}
