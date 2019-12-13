import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './containers/app'
import socketMiddleware from './middlewares/socketMiddleware'

const initialState = {
  username: null,
  typeGame: false,
  isPlaying: false,
  roomId: null,
  socket: null,
  rooms: [],
  userList: [],
  highscores: [],
}

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(socketMiddleware()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)
console.log(store)
ReactDom.render((
  <Provider store={ store }>
    <App/>
  </Provider>
), document.getElementById('tetris'))
