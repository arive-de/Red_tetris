"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./Wall.scss");

var _wall = require("../utils/wall");

var _classnames = _interopRequireDefault(require("classnames"));

const Wall = ({
  mute
}) => {
  const [grid, dispatchGrid] = (0, _react.useReducer)(_wall.wallReducer, Array(1551).fill(0));
  const colors = ['emptyCell', 'piece1', 'piece1', 'piece2', 'piece2', 'piece3', 'piece3', 'piece4', 'piece4', 'piece4', 'piece4', 'piece5', 'piece5', 'piece5', 'piece5', 'piece6', 'piece6', 'piece6', 'piece6', 'piece7'];
  (0, _react.useEffect)(() => {
    if (mute) {
      return;
    }

    const intervalPiece = setInterval(() => {
      dispatchGrid({
        type: 'TICK'
      });
    }, 3000);
    return () => {
      clearInterval(intervalPiece);
    };
  }, []);
  return _react.default.createElement("div", {
    className: "w-100 d-flex flex-row flex-wrap",
    id: "wallContainer"
  }, grid.map((cell, i) => _react.default.createElement("div", {
    className: (0, _classnames.default)({
      wallCell: true,
      wallCell1: i % 2 === 0,
      wallCell2: i % 2 !== 0,
      [colors[cell]]: true
    }, 'wallCell'),
    key: i
  }, cell)));
};

var _default = Wall;
exports.default = _default;