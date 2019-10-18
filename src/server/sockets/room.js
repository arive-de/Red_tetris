import { createRoom } from '../controllers/room'

export const initSocketRoom = (io, socket) => {

  socket.on('create_room', username => {

    createRoom(username, (data, error) => {
      if (error) {
        socket.emit('lobby', { error })
      }
      else {
        socket.roomId = data.roomId
        io.to('lobby').emit('created_room', data)
        socket.leave('lobby')
        socket.join(socket.roomId)
      }
    })
  })

  socket.on('join', ({ username, roomId }) => {
    console.log(`${username} joins the room ${roomId}`)
    io.sockets.emit('join', { username, roomId })
  })
}
