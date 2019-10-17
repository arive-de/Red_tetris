import reducerUser from './user'
import gameReducer from './gameList'
import getRoomReducer from './getRooms'

export default ( state, action ) => {
    return getRoomReducer(gameReducer( reducerUser( state, action ), action ), action)
}



