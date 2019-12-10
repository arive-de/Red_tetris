"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wallReducer = void 0;

const p0 = x => [x, x + 33, x + 66, x + 99];

const p1 = x => [x, x + 1, x + 2, x + 3];

const p2 = x => [x, x + 33, x + 34, x + 67];

const p3 = x => [x, x + 1, x + 32, x + 33];

const p4 = x => [x, x + 32, x + 33, x + 65];

const p5 = x => [x, x + 1, x + 34, x + 35];

const p6 = x => [x, x + 1, x + 2, x + 34];

const p7 = x => [x, x + 32, x + 33, x + 66];

const p8 = x => [x, x + 32, x + 33, x + 34];

const p9 = x => [x, x + 33, x + 34, x + 66];

const p10 = x => [x, x + 33, x + 66, x + 99];

const p11 = x => [x, x + 1, x + 2, x + 33];

const p12 = x => [x, x + 1, x + 34, x + 67];

const p13 = x => [x, x + 31, x + 32, x + 33];

const p14 = x => [x, x + 33, x + 65, x + 66];

const p15 = x => [x, x + 33, x + 34, x + 35];

const p16 = x => [x, x + 1, x + 33, x + 66];

const p17 = x => [x, x + 1, x + 2, x + 35];

const p18 = x => [x, x + 1, x + 33, x + 34];

const pieces = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18];

const handleTick = grid => {
  const indexPiece = Math.floor(Math.random() * 19);
  const startColumn = Math.floor(Math.random() * 27) + 3;
  const newGrid = [...Array(33).fill(0), ...grid.slice(0, 1518)];
  pieces[indexPiece](startColumn).forEach(c => {
    newGrid[c] = indexPiece + 1;
  });
  return newGrid;
};

const wallReducer = (grid, action) => {
  switch (action.type) {
    case 'TICK':
      return handleTick(grid);

    default:
      return grid;
  }
};

exports.wallReducer = wallReducer;