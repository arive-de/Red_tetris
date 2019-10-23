// import { } from '../controllers/url'

export const initSocketAuth = (io, socket) => {

  socket.on('url', ({ username, roomId }) => {
    console.log(username, roomId)
  })
}
