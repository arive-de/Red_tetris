import { SET_USER, GET_USERS, ADD_USER } from '../actions/user'

const reducer = (state, action) => {
  const { username, socket } = action
  switch (action.type) {
  case SET_USER:
    return { ...state, username, socket }
  case GET_USERS:
    return { ...state, userList: action.payload }
  case ADD_USER:
    return { ...state, userList: [...state.userList, action.username] }
  default:
    return state
  }
}

export default reducer
