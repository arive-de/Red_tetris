"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./Invite.scss");

const Invite = ({
  room
}) => {
  const [friend, setFriend] = (0, _react.useState)('');
  const [info, setInfo] = (0, _react.useState)(null);

  const onChange = e => {
    e.preventDefault();
    setFriend(e.target.value);
  };

  const onClick = () => {
    if (friend.length === 0 || room.players.indexOf(friend) !== -1) {
      return;
    }

    const url = `${document.location.hostname}:${document.location.port}/#${room.roomId}[${friend}]`;
    navigator.clipboard.writeText(url).then(() => {
      setInfo('invitation URL copied to clipboard :)');
    });
  };

  (0, _react.useEffect)(() => {
    const timeout = setTimeout(() => {
      setInfo(null);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  });
  return _react.default.createElement("div", null, info !== null && _react.default.createElement("div", {
    className: "invite-alert alert alert-success"
  }, info), _react.default.createElement("div", {
    className: "d-flex row justify-content-end"
  }, _react.default.createElement("div", {
    className: ""
  }, _react.default.createElement("input", {
    id: "friendInput",
    className: "form-control",
    onChange: onChange,
    placeholder: "Invite a friend",
    value: friend
  })), _react.default.createElement("i", {
    id: "friendButton",
    className: "fas fa-link fa-2x",
    onClick: onClick
  })));
};

var _default = Invite;
exports.default = _default;