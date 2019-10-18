import { createRoom } from '../controllers/room'

export const initSocketRoom = (io, socket) => {

  socket.on('create_room', username => {

    createRoom(username, (error, data) => {
      if (error === null) {
        socket.roomId = data.roomId
        io.to('lobby').emit('created_room', data)
        socket.leave('lobby')
        socket.join(socket.roomId)
      }
      else {
        socket.emit('lobby', { error })
      }
    })
  })

  socket.on('join', ({ username, roomId }) => {
    console.log(`${username} joins the room ${roomId}`)
    io.sockets.emit('join', { username, roomId })
  })
}