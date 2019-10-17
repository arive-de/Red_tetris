import reducerUser from './user'
import gameReducer from './gameList'
import getRoomReducer from './getRooms'
import getUsersReducer from './getUsers'

export default ( state, action ) => {
    return getUsersReducer(getRoomReducer(gameReducer( reducerUser( state, action ), action ), action), action)
}



