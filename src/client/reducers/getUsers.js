import { GET_USERLIST } from '../actions/getUsers'

const getUsersReducer = (state, action) => {

  switch (action.type) {
  case GET_USERLIST:
    return { ...state, userList: action.payload }
  default:
    return state
  }
}

export default getUsersReducer
