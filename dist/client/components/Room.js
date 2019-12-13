"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Game = _interopRequireDefault(require("./Game"));

var _Header = _interopRequireDefault(require("./Header"));

var _Invite = _interopRequireDefault(require("./Invite"));

var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));

var _Wall = _interopRequireDefault(require("./Wall"));

require("./Room.scss");

var _room = require("../actions/room");

const Room = ({
  room
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const [message, setMessage] = (0, _react.useState)('');
  const [messages, setMessages] = (0, _react.useState)([]);
  const username = (0, _reactRedux.useSelector)(state => state.username);
  const isPlaying = (0, _reactRedux.useSelector)(state => state.isPlaying);
  const socket = (0, _reactRedux.useSelector)(state => state.socket);

  const onChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const sendMessage = e => {
    if (e.key === 'Enter') {
      socket.emit('message', {
        roomId: room.roomdId,
        username,
        message
      });
      setMessage('');
    }
  };

  const onPlay = () => {
    socket.emit('play_game', {
      roomId: room.roomId
    });
  };

  const onReturn = () => {
    socket.emit('leave_room', {
      username,
      roomId: room.roomId
    });
  };

  (0, _react.useEffect)(() => {
    dispatch((0, _room.actInitRoomSocket)(setMessages, room));
    return () => {
      socket.removeListener('message');
      socket.removeListener('add_win');
    };
  }, []);

  if (isPlaying) {
    return _react.default.createElement(_Game.default, {
      room: room,
      solo: room.roomId === undefined ? true : false
    });
  }

  const rankInfos = [['1st', 'warning', 'firstRank'], ['2nd', 'secondary', 'secondRank'], ['3rd', 'danger', 'thirdRank'], ['4th', 'light', 'fourhtRank']];
  const sortedPlayers = room.players.map((p, i) => ({
    username: p,
    score: room.leaderBoard[i]
  })).sort((a, b) => b.score - a.score);
  return _react.default.createElement("div", null, _react.default.createElement(_Wall.default, null), _react.default.createElement(_Header.default, {
    title: `room ${room.roomId}`,
    onReturn: onReturn
  }), _react.default.createElement(_Invite.default, {
    room: room
  }), _react.default.createElement("div", {
    className: "m-3 d-flex flex-column"
  }, _react.default.createElement("div", {
    id: "leaderBoard",
    className: "w-50 align-self-center "
  }, _react.default.createElement(_ListGroup.default, {
    className: "list-group"
  }, sortedPlayers.map((player, i) => _react.default.createElement(_ListGroup.default.Item, {
    variant: rankInfos[i][1],
    className: rankInfos[i][2],
    key: i
  }, _react.default.createElement("div", {
    className: "d-flex row justify-content-around p-2 bd-highlight"
  }, _react.default.createElement("div", {
    className: "",
    id: "rank"
  }, `${rankInfos[i][0]}`), _react.default.createElement("div", {
    className: "font-weight-bold",
    id: `player${i}`
  }, player.username), _react.default.createElement("div", {
    className: "",
    id: "victories"
  }, player.score, " win", player.score > 1 ? 's' : '')))))), _react.default.createElement("div", {
    className: "align-self-center m-4"
  }, username === room.players[0] && !room.running && room.players.length > 1 ? _react.default.createElement("button", {
    id: "playButton",
    className: "btn btn-primary ",
    onClick: onPlay
  }, "Play") : null), _react.default.createElement("div", {
    id: "chat",
    className: "col-sm-12 align-self-center "
  }, _react.default.createElement("div", {
    className: "card"
  }, _react.default.createElement("div", {
    id: "logoChat",
    className: "p-2"
  }, _react.default.createElement("i", {
    className: "fas fa-comment fa-spin fa-2x"
  })), _react.default.createElement("div", {
    id: "messageBox",
    className: "card-body overflow-hidden d-flex flex-column flex-nowrap"
  }, messages.map((m, index) => {
    const playerIndex = sortedPlayers.findIndex(p => p.username === m.username);
    return _react.default.createElement("div", {
      className: `h-10 ${playerIndex === -1 ? '' : `bg-${rankInfos[playerIndex][1]}`}`,
      key: index
    }, _react.default.createElement("span", {
      className: "font-weight-bold"
    }, m.username, ":"), " ", m.message.substr(0, 100));
  }))), _react.default.createElement("div", null, _react.default.createElement("input", {
    autoFocus: true,
    id: "messageInput",
    className: "form-control",
    onChange: onChange,
    onKeyDown: sendMessage,
    placeholder: "Say something...",
    value: message
  })))));
};

var _default = Room;
exports.default = _default;