"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _room = require("../actions/room");

var _OverlayTrigger = _interopRequireDefault(require("react-bootstrap/OverlayTrigger"));

var _Tooltip = _interopRequireDefault(require("react-bootstrap/Tooltip"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./RoomList.scss");

const RoomList = ({
  active,
  onClick,
  room
}) => {
  const classes = (0, _classnames.default)({
    'flex-table row': true,
    'color-row': active ? 'color-row' : ''
  });
  return _react.default.createElement("div", {
    className: classes,
    onClick: onClick,
    role: "rowgroup"
  }, _react.default.createElement("div", {
    className: "flex-row first",
    role: "cell"
  }, room.roomId), _react.default.createElement("div", {
    className: "flex-row",
    role: "cell"
  }, room.type), _react.default.createElement(_OverlayTrigger.default, {
    key: "top",
    placement: "top",
    overlay: _react.default.createElement(_Tooltip.default, {
      id: "tooltip-top"
    }, room.players.map((m, index) => _react.default.createElement("div", {
      key: index
    }, m)))
  }, _react.default.createElement("div", {
    className: "flex-row",
    role: "cell"
  }, room.players.length, "/4")), _react.default.createElement("div", {
    className: "flex-row",
    role: "cell"
  }, !room.running ? 'Open' : 'Running'));
}; // PUT ON CLICK MODAL


var _default = RoomList;
exports.default = _default;