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
import openSocket from 'socket.io-client';

const initialState = {
  username: null,
  isPlaying: false,
  roomId: null,
  spectr: [],
  socket: null,
  gameList: [
    {
      players: ['Cedric', 'Fanfan', 'Arthur'],
      running: false,
      roomId: 'xx01',
      leader: 'Cedric',
    },
    {
      players: ['Joe', 'Wilfried'],
      running: true,
      roomId: 'xx02',
      leader: 'Joe',
    },
  ],
  playerList: [
    'arive-de',
    'cbarbier',
  ],
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, createLogger()),
)

store.dispatch(actSetUsername({ username: 'Alix', socket: openSocket('http://localhost:3004') }))

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))
