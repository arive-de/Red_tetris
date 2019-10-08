import { SET_USERNAME } from '../actions/user'

const reducer = (state, action) => {
  const { username, socket } = action
  switch (action.type) {
  case SET_USERNAME:
    return { ...state, username, socket }
  default:
    return state
  }
}

export default reducer
