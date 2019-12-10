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

var _room = require("../actions/room");

var _Home = _interopRequireDefault(require("../components/Home"));

var _Menu = _interopRequireDefault(require("../components/Menu"));

var _Lobby = _interopRequireDefault(require("../components/Lobby"));

var _Room = _interopRequireDefault(require("../components/Room"));

var _socket = _interopRequireDefault(require("socket.io-client"));

require("./app.scss");

const socket = (0, _socket.default)(`http://${window.location.hostname}:3004`);

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
    return () => {
      console.log('unmount app');
    };
  }, []);

  if (!storeSocket) {
    dispatch((0, _user.actSetSocket)(socket));
    const url = document.createElement('a');
    url.href = window.location.href;
    const res = url.hash.match(/^#(.*)\[(.*)\]$/);

    if (res && res[1] && res[2]) {
      const roomId = res[1];
      const username = res[2];
      dispatch((0, _user.actSetTypeGame)(true));
      socket.emit('url', {
        username,
        socketId: socket.socketId,
        roomId
      });
    }

    socket.on('auth', data => {
      if (data.error) {
        setErrorHome(data.error);
        return;
      }

      dispatch((0, _user.actSetUsername)(data.username));
      dispatch((0, _user.actAddUser)(data.username));
    });
    socket.on('lobby', data => {
      if (data.error) {
        setErrorLobby(data.error);
        return;
      }
    });
    socket.on('created_room', data => {
      dispatch((0, _room.actCreateRoom)(data));
    });
    socket.on('logout', data => {
      dispatch((0, _user.actLogout)(data));
    });
    socket.on('left_room', data => {
      dispatch((0, _room.actLeaveRoom)(data));
    });
    socket.on('joined_room', data => {
      dispatch((0, _room.actJoinRoom)(data));
    });
    socket.on('update', ({
      users,
      rooms
    }) => {
      dispatch((0, _room.actGetRooms)(rooms));
      dispatch((0, _user.actGetUsers)(users));
    });
    socket.on('play_game', data => {
      dispatch((0, _room.actPlayGame)(data));
    });
    socket.on('stop_game', data => {
      dispatch((0, _room.actStopGame)(data));
    });
    socket.on('highscore', data => {
      dispatch((0, _user.actGetHighscores)(data));
    }); // FOR GAME DEV
    // socket.emit('auth', 'cbarb')
  }

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