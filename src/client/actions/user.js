export const SET_USERNAME = 'SET_USERNAME'
export const SET_HOSTNAME = 'SET_HOSTNAME'
export const SET_TYPEGAME = 'SET_TYPEGAME'
export const SET_SOCKET = 'SET_SOCKET'
export const GET_USERS = 'GET_USERS'
export const ADD_USER = 'ADD_USER'
export const LOGOUT = 'LOGOUT'
export const GET_HIGHSCORES = 'GET_HIGHSCORES'
export const ADD_WIN = 'ADD_WIN'

export const actSetUsername = (username) => ({
  type: SET_USERNAME,
  username,
})

export const actSetTypeGame = (typeGame) => ({
  type: SET_TYPEGAME,
  typeGame,
})

export const actSetHostname = (hostname) => ({
  type: SET_HOSTNAME,
  hostname,
})

export const actSetSocket = (socket) => ({
  type: SET_SOCKET,
  socket,
})

export const actAddUser = (username) => ({
  type: ADD_USER,
  username,
})

export const actLogout = ({ username, roomId }) => ({
  type: LOGOUT,
  username,
  roomId,
})

export const actGetUsers = (users) => ({
  type: GET_USERS,
  users,
})

export const actGetHighscores = (highscores) => ({
  type: GET_HIGHSCORES,
  highscores,
})

export const actAddWin = (roomId, username) => ({
  type: ADD_WIN,
  roomId,
  username,
})
