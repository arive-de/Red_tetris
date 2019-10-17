import { GET_USERLIST, ADD_USERLIST } from '../actions/getUsers'

const getUsersReducer = (state, action) => {

  switch (action.type) {
  case GET_USERLIST:
    return { ...state, userList: action.payload }
  case ADD_USERLIST:
    return { ...state, userList: [...state.userList, action.username] }
  default:
    return state
  }
}

export default getUsersReducer
