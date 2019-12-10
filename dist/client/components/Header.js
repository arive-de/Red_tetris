"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _user = require("../actions/user");

var _reactRedux = require("react-redux");

var _navbar = _interopRequireDefault(require("react-bootstrap/navbar"));

var _button = _interopRequireDefault(require("react-bootstrap/button"));

const Header = ({
  error,
  setError,
  title,
  onReturn
}) => {
  return _react.default.createElement("div", null, error && _react.default.createElement("div", {
    className: "alert alert-danger",
    role: "alert"
  }, error), _react.default.createElement(_navbar.default, null, _react.default.createElement(_navbar.default.Brand, null, _react.default.createElement("i", {
    className: "leaveButton fas fa-arrow-alt-circle-left fa-2x",
    onClick: onReturn
  })), _react.default.createElement(_navbar.default.Toggle, null), _react.default.createElement(_navbar.default.Collapse, {
    className: "justify-content-center"
  }, _react.default.createElement(_navbar.default.Text, null, _react.default.createElement("h2", null, title)))));
};

var _default = Header;
exports.default = _default;