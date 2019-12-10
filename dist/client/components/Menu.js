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

var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));

var _Controls = _interopRequireDefault(require("./Controls"));

require("./Menu.scss");

var _Wall = _interopRequireDefault(require("./Wall"));

var _room = require("../actions/room");

const Menu = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const socket = (0, _reactRedux.useSelector)(state => state.socket);
  const highscores = (0, _reactRedux.useSelector)(state => state.highscores);
  const username = (0, _reactRedux.useSelector)(state => state.username);

  const onClickMultiplayer = () => {
    dispatch((0, _user.actSetTypeGame)(true));
  };

  const onClickSolo = () => {
    dispatch((0, _room.actCreateRoom)({
      roomId: undefined,
      players: [username],
      running: true,
      leaderBoard: [0]
    }));
    dispatch((0, _room.actPlayGame)(undefined));
  }; // FOR GAME Dev
  // onClickSolo()


  (0, _react.useEffect)(() => {
    socket.emit('highscore');
  }, []);
  return _react.default.createElement("div", null, _react.default.createElement(_Wall.default, null), _react.default.createElement("div", {
    className: "d-flex flex-column justify-content-around",
    id: "menu-box"
  }, _react.default.createElement("div", {
    className: "align-self-stretch"
  }, _react.default.createElement("div", {
    className: "d-flex row justify-content-around"
  }, _react.default.createElement(_ListGroup.default, {
    className: "list-group"
  }, highscores.sort((a, b) => b.score - a.score).map((player, i) => _react.default.createElement(_ListGroup.default.Item, {
    variant: "warning",
    key: i
  }, _react.default.createElement("div", {
    className: "d-flex row justify-content-around p-2 bd-highlight"
  }, _react.default.createElement("div", null, _react.default.createElement("i", {
    className: "fas fa-trophy"
  })), _react.default.createElement("div", {
    className: "font-weight-bold",
    id: "highscoreUsername"
  }, player.username), _react.default.createElement("div", {
    className: "",
    id: "highscoreScore"
  }, player.score, " pts"))))))), _react.default.createElement("div", {
    className: " align-self-center"
  }, _react.default.createElement("div", {
    className: "card-container card text-center"
  }, _react.default.createElement("h5", {
    className: "card-title"
  }, "Menu"), _react.default.createElement("div", null, _react.default.createElement("button", {
    className: "btn btn-primary",
    onClick: onClickSolo
  }, "Solo")), _react.default.createElement("div", null, _react.default.createElement("button", {
    className: "btn btn-primary",
    onClick: onClickMultiplayer
  }, "Multiplayer")))), _react.default.createElement("div", {
    className: "align-self-center"
  }, _react.default.createElement(_Controls.default, null))));
};

var _default = Menu;
exports.default = _default;