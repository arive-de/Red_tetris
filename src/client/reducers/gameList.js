import { SET_GAMELIST } from '../actions/gameList'

const gameReducer = (state, action) => {
  switch (action.type) {
  case SET_GAMELIST:
    return { ...state, gameList: [...state.gameList, action.game]}
  default:
    return state
  }
}

export default gameReducer
