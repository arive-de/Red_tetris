import { GET_GAMELIST } from '../actions/getRooms'

const getRoomReducer = (state, action) => {
    
  switch (action.type) {
  case GET_GAMELIST:
    return { ...state, gameList: action.payload }
  default:
    return state
  }
}

export default getRoomReducer
