import { GET_ROOMS, CREATE_ROOM, JOIN_ROOM, LEAVE_ROOM, PLAY_GAME, STOP_GAME, QUIT_GAME } from '../actions/room'

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
        const newPlayers = [...r.players, username]
        const newLeaderBoard = [...r.leaderBoard, 0]
        return {
          ...r,
          leaderBoard: newLeaderBoard,
          players: newPlayers,
        }
      }
      return r
    }) }
  case LEAVE_ROOM:
    return { ...state, roomId: username === state.username ? null : state.roomId,
      isPlaying: username === state.username ? false : state.isPlaying, rooms: state.rooms.map(r => {
        if (r.roomId === roomId) {
          const newLeaderBoard = [...r.leaderBoard]
          newLeaderBoard.splice(r.players.indexOf(username), 1)
          const newPlayers = r.players.filter(p => p !== username)
          return {
            ...r,
            leaderBoard: newLeaderBoard,
            players: newPlayers,
          }
        }
        return r
      }).filter(r => r.players.length > 0) }
  case PLAY_GAME:
    return { ...state, isPlaying: state.roomId !== null && roomId === state.roomId ? true : state.isPlaying, rooms: state.rooms.map(r => {
      if (r.roomId === roomId) {
        return {
          ...r,
          running: true,
        }
      }
      return r
    }),
  }
  case QUIT_GAME:
    return { ...state, isPlaying: false }
  case STOP_GAME:
    return { ...state, isPlaying: false, rooms: state.rooms.map(r => {
      if (r.roomId === roomId) {
        return {
          ...r,
          running: false,
        }
      }
      return r
    }),
  }
  default:
    return state
  }
}

export default gameReducer
