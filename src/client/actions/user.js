export const SET_USER = 'SET_USER'
export const GET_USERS = 'GET_USERS'
export const ADD_USER = 'ADD_USER'

export const actSetUser = ({ username, socket }) => ({
  type: SET_USER,
  username,
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
