import { SET_USERNAME } from '../actions/user'

const reducer = (state, action) => {
  switch (action.type) {
  case SET_USERNAME:
    return { ...state, username: action.username }
  default:
    return state
  }
}

export default reducer
