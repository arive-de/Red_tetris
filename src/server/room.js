
export function initSocketRoom(io, socket) {
  socket.on('create', (username) => {
    console.log(`${username} creates a room`)
    io.sockets.emit('create', {
      players: [username],
      leader: username,
      running: false,
      roomId: 'xx03',
    })
  })
  socket.on('join', ({ username, roomId }) => {
    console.log(`${username} joins the room ${roomId}`)
    io.sockets.emit('join', { username, roomId })
  })
}
