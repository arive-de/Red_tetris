export const GET_USERLIST = 'GET_USERLIST'
export const ADD_USERLIST = 'ADD_USERLIST'

export const actGetUserList = (players) => ({
  type: GET_USERLIST,
  players,
})

export const actAddUserList = (username) => ({
  type: ADD_USERLIST,
  username,
})

