"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _navbar = _interopRequireDefault(require("react-bootstrap/navbar"));

const Header = ({
  error,
  setError,
  title,
  onReturn
}) => {
  (0, _react.useEffect)(() => {
    if (!error) {
      return;
    }

    const timeout = setTimeout(() => {
      setError(e => null);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  });
  return _react.default.createElement("div", null, error && _react.default.createElement("div", {
    className: "error alert alert-danger"
  }, error), _react.default.createElement(_navbar.default, null, _react.default.createElement(_navbar.default.Brand, null, _react.default.createElement("i", {
    className: "leaveButton fas fa-arrow-alt-circle-left fa-2x",
    onClick: onReturn
  })), _react.default.createElement(_navbar.default.Toggle, null), _react.default.createElement(_navbar.default.Collapse, {
    className: "justify-content-center"
  }, _react.default.createElement(_navbar.default.Text, null, _react.default.createElement("h2", null, title)))));
};

var _default = Header;
exports.default = _default;