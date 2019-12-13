"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _Wall = _interopRequireDefault(require("./Wall"));

require("./Home.scss");

const Home = ({
  error,
  setError
}) => {
  const [username, setUsername] = (0, _react.useState)('');
  const socket = (0, _reactRedux.useSelector)(state => state.socket);

  const onChange = e => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && username.length) {
      socket.emit('auth', username);
      socket.emit('highscore');
    }
  };

  (0, _react.useEffect)(() => {
    setError(error);
    const timeout = setTimeout(() => {
      setError(null);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);
  return _react.default.createElement("div", {
    className: "d-flex row",
    id: "home-box"
  }, error && _react.default.createElement("div", {
    className: "error alert alert-danger"
  }, error), _react.default.createElement(_Wall.default, null), _react.default.createElement("div", {
    className: "card justify-content-center align-self-center mx-auto"
  }, _react.default.createElement("div", {
    className: "card-container card-body text-center"
  }, _react.default.createElement("h5", {
    className: "card-title"
  }, "TetrisForJeff"), _react.default.createElement("div", {
    className: "form-group d-flex flex-column align-items-center"
  }, _react.default.createElement("input", {
    autoFocus: true,
    className: "form-control",
    maxLength: "12",
    onChange: onChange,
    onKeyDown: handleKeyDown,
    placeholder: "username"
  })))));
};

var _default = Home;
exports.default = _default;