// import { } from '../controllers/url'

export const initSocketUrl = (io, socket) => {

  socket.on('url', ({ username, roomId }) => {
    console.log(username, roomId)
  })
}
