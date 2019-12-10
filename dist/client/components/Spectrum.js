"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./Spectrum.scss");

var _classnames = _interopRequireDefault(require("classnames"));

const Spectrum = ({
  grid,
  username,
  mute
}) => {
  const colors = ['emptyCell', 'piece1', 'piece1', 'piece2', 'piece2', 'piece3', 'piece3', 'piece4', 'piece4', 'piece4', 'piece4', 'piece5', 'piece5', 'piece5', 'piece5', 'piece6', 'piece6', 'piece6', 'piece6', 'piece7'];
  (0, _react.useEffect)(() => {
    return () => {};
  }, []);

  if (mute) {
    return null;
  }

  return _react.default.createElement("div", {
    id: "spectrumContainer"
  }, username, _react.default.createElement("div", {
    className: "spectrumContainer w-100 d-flex flex-row flex-wrap"
  }, grid.map((cell, i) => _react.default.createElement("div", {
    className: (0, _classnames.default)({
      gridCell: true,
      gridCell1: i % 2 === 0,
      gridCell2: i % 2 !== 0,
      blockCell: cell === -1,
      [colors[cell]]: true
    }, 'spectrumCell'),
    key: i
  }, "."))));
};

var _default = Spectrum;
exports.default = _default;