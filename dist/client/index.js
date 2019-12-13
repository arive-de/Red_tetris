"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _app = _interopRequireDefault(require("./containers/app"));

var _socketMiddleware = _interopRequireDefault(require("./middlewares/socketMiddleware"));

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
const store = (0, _redux.createStore)(_reducers.default, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)((0, _socketMiddleware.default)()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
console.log(store);

_reactDom.default.render(_react.default.createElement(_reactRedux.Provider, {
  store: store
}, _react.default.createElement(_app.default, null)), document.getElementById('tetris'));