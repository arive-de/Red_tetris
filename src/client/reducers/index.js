import roomReducer from './room'
import userReducer from './user'

export default (state, action) => {
  const reducers = [userReducer, roomReducer]
  return reducers.reduce((acc, f) => f(acc, action), state)
}
