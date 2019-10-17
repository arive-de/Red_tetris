import { SET_USER, GET_USERS } from '../actions/user'

const reducer = (state, action) => {
  const { username, socket } = action
  switch (action.type) {
  case SET_USER:
    return { ...state, username, socket }
  case GET_USERS:
    return { ...state, userList: action.payload }
  default:
    return state
  }
}

export default reducer
