"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./Controls.scss");

const Controls = () => {
  return _react.default.createElement("div", {
    className: "card card-container d-flex justify-content-center align-items-center text-center"
  }, _react.default.createElement("h5", {
    className: "card-title"
  }, "Controls"), _react.default.createElement("div", {
    className: "row"
  }, _react.default.createElement("div", null, _react.default.createElement("i", {
    className: "arrows invisible fas fa-caret-up"
  }), _react.default.createElement("p", {
    className: "invisible"
  })), _react.default.createElement("div", null, _react.default.createElement("i", {
    className: "arrows fas fa-caret-up"
  }), _react.default.createElement("p", null, "Rotate right")), _react.default.createElement("div", null, _react.default.createElement("i", {
    className: "arrows invisible fas fa-caret-up"
  }), _react.default.createElement("p", {
    className: "invisible"
  }))), _react.default.createElement("div", {
    className: "row"
  }, _react.default.createElement("div", null, _react.default.createElement("i", {
    className: "arrows fas fa-caret-left"
  }), _react.default.createElement("p", null, "Move left")), _react.default.createElement("div", null, _react.default.createElement("i", {
    className: "arrows fas fa-caret-down"
  }), _react.default.createElement("p", null, "Soft drop")), _react.default.createElement("div", null, _react.default.createElement("i", {
    className: "arrows fas fa-caret-right"
  }), _react.default.createElement("p", null, "Move right"))), _react.default.createElement("div", {
    className: "space-bar"
  }, "Space"), _react.default.createElement("p", null, "Hard drop"));
};

var _default = Controls;
exports.default = _default;