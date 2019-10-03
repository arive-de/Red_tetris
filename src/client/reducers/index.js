import reducerUser from './user'
import gameReducer from './gameList'

export default ( state, action ) => {
    return gameReducer( reducerUser( state, action ), action )
}



