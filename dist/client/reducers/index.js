"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _room = _interopRequireDefault(require("./room"));

var _user = _interopRequireDefault(require("./user"));

var _default = (state, action) => {
  const reducers = [_user.default, _room.default];
  return reducers.reduce((acc, f) => f(acc, action), state);
};

exports.default = _default;