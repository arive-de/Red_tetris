export const SET_USERNAME = 'SET_USERNAME'

export const actSetUsername = ({ username, socket }) => ({
  type: SET_USERNAME,
  username,
  socket
})
