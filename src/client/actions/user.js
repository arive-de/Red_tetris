export const SET_USERNAME = 'SET_USERNAME'
export const SET_SOCKET = 'SET_SOCKET'
export const GET_USERS = 'GET_USERS'
export const ADD_USER = 'ADD_USER'
export const LOGOUT = 'LOGOUT'

export const actSetUsername = (username) => ({
  type: SET_USERNAME,
  username,
})

export const actSetSocket = (socket) => ({
  type: SET_SOCKET,
  socket,
})

export const actAddUser = (username) => ({
  type: ADD_USER,
  username,
})

export const actGetUsers = (players) => ({
  type: GET_USERS,
  players,
})

export const actLogout = ({ username, roomId }) => ({
  type: LOGOUT,
  username,
  roomId,
})
