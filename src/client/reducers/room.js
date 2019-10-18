import { GET_ROOMS, CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, LEAVE_MASTER_ROOM } from '../actions/room'

const gameReducer = (state, action) => {
  const { username, leader, roomId, room } = action
  switch (action.type) {
  case GET_ROOMS:
    return { ...state, rooms: action.payload }
  case CREATE_ROOM:
    return { ...state, roomId: room.leader === state.username ?
      room.roomId : state.roomId, rooms: [...state.rooms, room] }
  case JOIN_ROOM:
    return { ...state, roomId, rooms: state.rooms.map(r => {
      if (r.roomId === roomId) {
        r.players = [...r.players, username]
      }
      return r
    }) }
  case LEAVE_ROOM:
    return { ...state, roomId: null, isPlaying: false, rooms: state.ROOM.map(r => {
      if (r.roomId === roomId) {
        r.players = r.players.filter(p => p !== username)
      }
      return r
    }).filter(r => r.players.length > 0) }
  case LEAVE_MASTER_ROOM:
    return { ...state, roomId: null, isPlaying: false, rooms: state.rooms.map(r => {
      if (r.roomId === roomId) {
        r.players = r.players.filter(p => p !== username)
        if (r.players.length > 0) {
          r.leader = r.players[0]
        }
      }
      return r
    }).filter(r => r.players.length > 0) }
  default:
    return state
  }
}

export default gameReducer
