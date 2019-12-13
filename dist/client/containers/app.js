"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _user = require("../actions/user");

var _Home = _interopRequireDefault(require("../components/Home"));

var _Menu = _interopRequireDefault(require("../components/Menu"));

var _Lobby = _interopRequireDefault(require("../components/Lobby"));

var _Room = _interopRequireDefault(require("../components/Room"));

require("./app.scss");

const App = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const storeSocket = (0, _reactRedux.useSelector)(state => state.socket);
  const username = (0, _reactRedux.useSelector)(state => state.username);
  const roomId = (0, _reactRedux.useSelector)(state => state.roomId);
  const rooms = (0, _reactRedux.useSelector)(state => state.rooms);
  const typeGame = (0, _reactRedux.useSelector)(state => state.typeGame);
  const [errorHome, setErrorHome] = (0, _react.useState)('');
  const [errorLobby, setErrorLobby] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {
    if (storeSocket) {
      return;
    }

    dispatch((0, _user.actConnectSocket)(setErrorHome, setErrorLobby));
    return () => {
      console.log('unmount app');
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (!storeSocket) {
      return;
    }

    const url = document.createElement('a');
    url.href = window.location.href;
    const res = url.hash.match(/^#(.*)\[(.*)\]$/);

    if (res && res[1] && res[2]) {
      const roomId = res[1].substr(0, 10);
      const username = res[2].substr(0, 10);
      dispatch((0, _user.actSetTypeGame)(true));
      storeSocket.emit('url', {
        username,
        socketId: storeSocket.socketId,
        roomId
      });
    }
  }, [storeSocket]);

  if (username !== null && roomId !== null) {
    if (rooms.find(r => r.roomId === roomId)) {
      return _react.default.createElement(_Room.default, {
        room: rooms.find(r => r.roomId === roomId)
      });
    } else {
      return _react.default.createElement("div", null, "Loading");
    }
  }

  if (username !== null && typeGame === false) {
    return _react.default.createElement(_Menu.default, null);
  }

  if (username !== null && typeGame === true) {
    return _react.default.createElement(_Lobby.default, {
      error: errorLobby,
      setError: setErrorLobby
    });
  }

  return _react.default.createElement(_Home.default, {
    error: errorHome,
    setError: setErrorHome
  });
};

var _default = App;
exports.default = _default;