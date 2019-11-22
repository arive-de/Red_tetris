import { GET_ROOMS, CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, PLAY_GAME } from '../actions/room'

const gameReducer = (state, action) => {
  const { username, roomId, room, rooms } = action
  switch (action.type) {
  case GET_ROOMS:
    return { ...state, rooms }
  case CREATE_ROOM:
    return { ...state, roomId: room.players[0] === state.username ?
      room.roomId : state.roomId, rooms: [...state.rooms, room] }
  case JOIN_ROOM:
    return { ...state, roomId: username === state.username ? roomId : state.roomId, rooms: state.rooms.map(r => {
      if (r.roomId === roomId) {
        r.players = [...r.players, username]
      }
      return r
    }) }
  case LEAVE_ROOM:
    return { ...state, roomId: username === state.username ? null : state.roomId,
      isPlaying: username === state.username ? false : state.isPlaying, rooms: state.rooms.map(r => {
        if (r.roomId === roomId) {
          r.players = r.players.filter(p => p !== username)
        }
        return r
      }).filter(r => r.players.length > 0) }
  case PLAY_GAME:
    return { ...state, isPlaying: state.roomId !== null && roomId === state.roomId ? true : state.isPlaying, rooms: state.rooms.map(r => {
      if (r.roomId === roomId) {
        r.running = true
      }
      return r
    }),
    }
  default:
    return state
  }
}

export default gameReducer
