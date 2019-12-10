"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _app = _interopRequireDefault(require("./containers/app"));

const initialState = {
  username: null,
  typeGame: false,
  isPlaying: false,
  roomId: null,
  socket: null,
  rooms: [],
  userList: [],
  highscores: []
};
const store = (0, _redux.createStore)(_reducers.default, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), (0, _redux.applyMiddleware)(_reduxThunk.default, (0, _reduxLogger.default)()));

_reactDom.default.render(_react.default.createElement(_reactRedux.Provider, {
  store: store
}, _react.default.createElement(_app.default, null)), document.getElementById('tetris'));