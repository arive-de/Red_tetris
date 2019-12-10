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

var _RoomList = _interopRequireDefault(require("./RoomList"));

var _Wall = _interopRequireDefault(require("./Wall"));

var _SearchPlayer = _interopRequireDefault(require("./SearchPlayer"));

var _Header = _interopRequireDefault(require("./Header"));

require("./Lobby.scss");

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

const Lobby = ({
  error,
  setError
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const username = (0, _reactRedux.useSelector)(state => state.username);
  const socket = (0, _reactRedux.useSelector)(state => state.socket);
  const rooms = (0, _reactRedux.useSelector)(state => state.rooms);
  const [type, setType] = (0, _react.useState)('Classic');
  const [chosen, setChosen] = (0, _react.useState)(null);
  const [hideShow, setHideShow] = (0, _react.useState)(false);
  const [sortField, setSortField] = (0, _react.useState)('roomId');
  const title = 'Lobby';

  const onCreate = () => {
    socket.emit('create_room', {
      username,
      type
    });
  };

  const onChange = e => {
    setType(e.target.value);
  };

  const onCheck = () => {
    setHideShow(!hideShow);
  };

  const onJoin = room => {
    socket.emit('join_room', {
      roomId: room.roomId
    });
  };

  (0, _react.useEffect)(() => {
    socket.emit('update', {});
  }, []);

  const sortRooms = filter => (a, b) => {
    if (filter === 'players') {
      return a.players.length - b.players.length;
    }

    if (filter === 'running') {
      return a.running - b.running;
    }

    if (filter === 'type') {
      return a.type.localeCompare(b.type);
    }

    if (filter === 'roomId') {
      return a.roomId.localeCompare(b.roomId);
    }
  };

  (0, _react.useEffect)(() => {
    return () => {
      setError(null);
    };
  }, []);

  const onReturn = () => {
    dispatch((0, _user.actSetTypeGame)(false));
  };

  return _react.default.createElement("div", null, _react.default.createElement(_Wall.default, null), _react.default.createElement(_Header.default, {
    error: error,
    setError: setError,
    title: title,
    onReturn: onReturn
  }), _react.default.createElement("br", null), _react.default.createElement("div", {
    className: ""
  }, _react.default.createElement("div", {
    className: "card"
  }, _react.default.createElement("div", {
    className: "card-body"
  }, _react.default.createElement("div", {
    className: "table-container",
    role: "table"
  }, _react.default.createElement("div", {
    className: "flex-table header",
    role: "rowgroup"
  }, _react.default.createElement("div", {
    className: "flex-row first",
    role: "columnheader"
  }, "Room", _react.default.createElement("i", {
    className: "sort fas fa-sort d-flex justify-content-end",
    onClick: () => {
      setSortField('roomId');
    }
  })), _react.default.createElement("div", {
    className: "flex-row",
    role: "columnheader"
  }, "Game", _react.default.createElement("i", {
    className: "sort fas fa-sort d-flex justify-content-end",
    onClick: () => {
      setSortField('type');
    }
  })), _react.default.createElement("div", {
    className: "flex-row",
    role: "columnheader"
  }, "Players", _react.default.createElement("i", {
    className: "sort fas fa-sort d-flex justify-content-end",
    onClick: () => {
      setSortField('players');
    }
  })), _react.default.createElement("div", {
    className: "flex-row",
    role: "columnheader"
  }, "Status", _react.default.createElement("i", {
    className: "sort fas fa-sort d-flex justify-content-end",
    onClick: () => {
      setSortField('running');
    }
  }))), rooms.sort(sortRooms(sortField)).filter(room => hideShow ? room.running === false && room.players.length !== 4 : true).map((room, index) => _react.default.createElement(_RoomList.default, {
    active: room === chosen,
    key: index,
    onClick: () => setChosen(room),
    room: room
  })))), _react.default.createElement("div", {
    className: "text-center"
  }, _react.default.createElement(_Button.default, {
    id: "joinRoomButton",
    className: "button",
    disabled: chosen === null,
    onClick: () => onJoin(chosen),
    variant: "primary"
  }, "Join"))), _react.default.createElement("div", {
    className: "form-check"
  }, _react.default.createElement("input", {
    className: "form-check-input",
    id: "hide",
    onClick: onCheck,
    type: "checkbox",
    value: ""
  }), _react.default.createElement("i", {
    className: "fas fa-filter"
  })), _react.default.createElement("div", {
    className: "card-body",
    id: "lobby"
  }, _react.default.createElement("div", {
    className: "row"
  }, _react.default.createElement("div", {
    className: "col"
  }, _react.default.createElement(_SearchPlayer.default, {
    rooms: rooms,
    onJoin: onJoin
  })), _react.default.createElement("div", {
    className: "col"
  }, _react.default.createElement("div", {
    className: "card"
  }, _react.default.createElement("div", {
    className: "card-body"
  }, _react.default.createElement("h5", {
    className: "card-title"
  }, "Host a game"), _react.default.createElement("div", {
    className: "input-group mb-3"
  }, _react.default.createElement("div", {
    className: "input-group-prepend"
  }, _react.default.createElement("label", {
    className: "input-group-text"
  }, "Type")), _react.default.createElement("select", {
    className: "custom-select",
    onChange: onChange,
    value: type
  }, _react.default.createElement("option", {
    value: "Classic"
  }, "Classic"), _react.default.createElement("option", {
    value: "Ghost"
  }, "Ghost "))), _react.default.createElement(_Button.default, {
    onClick: onCreate,
    variant: "primary"
  }, "Create"))))))));
};

var _default = Lobby;
exports.default = _default;