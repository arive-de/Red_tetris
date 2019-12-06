import { SET_USERNAME, SET_TYPEGAME, SET_SOCKET, GET_USERS, ADD_USER, LOGOUT, GET_HIGHSCORES, ADD_WIN } from '../actions/user'

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
  console.log(action)
  const { username, typeGame, socket } = action
  switch (action.type) {
  case SET_USERNAME:
    return state.username !== null ? { ...state } : { ...state, username }
  case SET_TYPEGAME:
    return { ...state, typeGame }
  case SET_SOCKET:
    return { ...state, socket }
  case GET_USERS:
    return { ...state, userList: action.users }
  case ADD_USER:
    return { ...state, userList: [...state.userList, action.username] }
  case LOGOUT:
    return deleteUser(state, username, action.roomId)
  case GET_HIGHSCORES:
    return { ...state, highscores: action.highscores }
  case ADD_WIN:
    return {
      ...state,
      rooms: state.rooms.map(r => {
        if (r.roomId === action.roomId) {
          r.leaderBoard[r.players.indexOf(username)] += 1
        }
        return r
      }),
    }
  default:
    return state
  }
}

export default reducer
