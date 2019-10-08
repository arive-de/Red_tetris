import { SET_GAMELIST, JOIN_GAMELIST, LEAVE_GAMELIST, LEAVE_MASTER_GAMELIST } from '../actions/gameList'

const gameReducer = (state, action) => {
  const { username, roomId, game } = action
  switch (action.type) {
  case SET_GAMELIST:
    return { ...state, roomId: game.roomId, gameList: [...state.gameList, game]}
  case JOIN_GAMELIST:
    return { ...state, roomId, gameList: state.gameList.map(r => {
      if (r.roomId === roomId) {
        r.players = [...r.players, username]
      }
      return r
    }) }
  case LEAVE_GAMELIST:
    return { ...state, roomId: null, isPlaying: false, gameList: state.gameList.map(r => {
      if (r.roomId === roomId) {
        r.players = r.players.filter(p => p !== username)
      }
      return r
    }).filter(r => r.players.length > 0) }
  case LEAVE_MASTER_GAMELIST:
    return { ...state, roomId: null, isPlaying: false, gameList: state.gameList.map(r => {
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
