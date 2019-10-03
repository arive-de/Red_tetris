import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import reducer from './reducers'
import App from './containers/app'
import { actSetUsername } from './actions/user'

const initialState = {
  username: null,
  isPlaying: false,
  roomid: null,
  master: null,
  nbPlayer: 0,
  spectr: [],
  gameList: [
    {
      players: ['Cedric', 'Fanfan', 'Arthur'],
      running: false,
      roomId: 'xx01'
    },
    {
        players: ['Joe', 'Wilfried'],
        running: true,
        roomId: 'xx02'
    }
  ]
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, createLogger()),
)

store.dispatch(actSetUsername('Alix'))

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))
