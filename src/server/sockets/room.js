import { createRoom, joinRoom, leaveRoom } from '../controllers/room'

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

  socket.on('join_room', ({ roomId }) => {
    joinRoom(socket.username, roomId, (error, data) => {
      if (error === null) {
        console.log(`${socket.username} joins the room ${roomId}`)
        socket.roomId = data.roomId
        socket.leave('lobby')
        io.to('lobby').emit('joined_room', data)
        socket.join(socket.roomId)
        io.to(socket.roomId).emit('joined_room', data)
      }
      else {
        console.log(error)
        socket.emit('lobby', { error })
      }
    })
  })

  socket.on('message', ({ message }) => {
    console.log(`${socket.username} sent a ${message} to ${socket.roomId}`)
    io.to(socket.roomId).emit('message', { username: socket.username, message })
  })

  socket.on('leave_room', ({ roomId, username }) => {
    console.log(`${socket.username} leaves the room ${roomId}`)
    leaveRoom(username, roomId, (error, data) => {
      if (error === null) {
        socket.roomId = null
        io.to(roomId).emit('left_room', data)
        socket.leave(roomId)
        io.to('lobby').emit('left_room', data)
        socket.join('lobby')
      }
      else {
        socket.emit('lobby', { error })
      }
    })
  })
}
