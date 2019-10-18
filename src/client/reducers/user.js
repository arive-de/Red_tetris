import { SET_USER, GET_USERS, ADD_USER, LOGOUT } from '../actions/user'

const deleteUser = (state, username, roomId) => {
  const userList = state.userList.filter(u => u !== username)
  let rooms;
  if (roomId) {
    rooms = state.rooms.map(r => {
      if (r.roomId === roomId) {
        return { ...r, players: r.players.filter(u => u !== username) }
      }
      return r
    })
  } else {
    rooms = [...state.rooms]
  }
  return { ...state, userList, rooms: rooms.filter(r => r.players.length > 0) }
}


const reducer = (state, action) => {
  const { username, socket } = action
  switch (action.type) {
  case SET_USER:
    return { ...state, username, socket }
  case GET_USERS:
    return { ...state, userList: action.payload }
  case ADD_USER:
    return { ...state, userList: [...state.userList, action.username] }
  case LOGOUT:
    return deleteUser(state, username, action.roomId)
  default:
    return state
  }
}

export default reducer
