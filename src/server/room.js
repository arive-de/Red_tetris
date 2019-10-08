
export function initSocketRoom(io, socket) {
  socket.on('create', (username) => {
    console.log(`${username} creates a room`)
    io.emit('create', {
      players: [username],
      running: false,
      roomId: 'xx03',
    })
  })
  socket.on('join', ({ username, roomId }) => {
    console.log('${username} joins the room ${roomId}')
    io.emit('join', { username, roomId })
  })
}
