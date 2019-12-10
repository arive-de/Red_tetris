"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameReducer = void 0;

var _pieces = require("../utils/pieces");

const scoring = [40, 100, 300, 1200];

const handleTick = state => {
  const {
    type,
    piece,
    pieces,
    grid,
    spectrums
  } = state;
  const [ok, nextPiece] = (0, _pieces.canDrop)(piece, grid);

  if (!ok) {
    if (_pieces.pieces[pieces[0]].some(c => state.grid[c] !== 0)) {
      return { ...state,
        piece: [],
        end: true
      };
    }

    const [newGrid, nbLine] = (0, _pieces.updateFullLine)(grid, _pieces.pieces[pieces[0]], pieces[0]);
    return { ...state,
      type: pieces[0],
      piece: _pieces.pieces[pieces[0]],
      pieces: pieces.slice(1),
      grid: newGrid,
      lines: nbLine,
      score: nbLine > 0 ? state.score + scoring[nbLine - 1] : state.score
    };
  }

  return { ...state,
    piece: nextPiece,
    grid: (0, _pieces.updateGrid)(piece, nextPiece, type, grid)
  };
};

const handleDown = state => {
  const {
    type,
    piece,
    pieces,
    grid,
    spectrums
  } = state;
  const [ok, nextPiece] = (0, _pieces.canDrop)(piece, grid);

  if (!ok) {
    return state;
  }

  return { ...state,
    piece: nextPiece,
    grid: (0, _pieces.updateGrid)(piece, nextPiece, type, grid)
  };
};

const handleMove = (state, fn, arg) => {
  const {
    type,
    piece,
    grid
  } = state;
  const nextPiece = fn(piece, arg);

  if (!(0, _pieces.canFit)(piece, nextPiece, grid)) {
    return state;
  }

  return { ...state,
    grid: (0, _pieces.updateGrid)(piece, nextPiece, type, grid),
    piece: nextPiece
  };
};

const handleDrop = (state, arg) => {
  const {
    type,
    piece,
    pieces,
    grid
  } = state;
  const nextPiece = (0, _pieces.dropBottom)(piece, arg);

  if (!(0, _pieces.canFit)(piece, nextPiece, grid)) {
    return state;
  }

  if (_pieces.pieces[pieces[0]].some(c => nextPiece.indexOf(c) !== -1)) {
    return { ...state,
      piece: [],
      end: true
    };
  }

  const [newGrid, nbLine] = (0, _pieces.updateFullLine)((0, _pieces.updateGrid)(piece, nextPiece, type, grid), _pieces.pieces[pieces[0]], pieces[0]);
  return { ...state,
    type: pieces[0],
    piece: _pieces.pieces[pieces[0]],
    pieces: pieces.slice(1),
    grid: newGrid,
    lines: nbLine,
    score: nbLine > 0 ? state.score + scoring[nbLine - 1] : state.score
  };
};

const handlePieces = (state, newPieces) => {
  const nextState = { ...state,
    pieces: [...state.pieces, ...newPieces]
  };

  if (state.piece.length) {
    return nextState;
  }

  return { ...nextState,
    type: nextState.pieces[0],
    piece: _pieces.pieces[nextState.pieces[0]],
    pieces: nextState.pieces.slice(1),
    grid: (0, _pieces.updateGrid)(_pieces.pieces[nextState.pieces[0]], _pieces.pieces[nextState.pieces[0]], nextState.pieces[0], nextState.grid)
  };
};

const handleRotate = state => {
  const {
    type,
    piece,
    grid
  } = state;
  const nextType = (0, _pieces.rotationTypes)(type);
  const nextPiece = (0, _pieces.rotationFuncs)(piece, type);

  if (!(0, _pieces.canFit)(piece, nextPiece, grid)) {
    return state;
  }

  return { ...state,
    grid: (0, _pieces.updateGrid)(piece, nextPiece, nextType, grid),
    piece: nextPiece,
    type: nextType
  };
};

const handleSpectrum = (state, {
  index,
  spectrum
}) => {
  const newSpectrums = [...state.spectrums];
  newSpectrums[index] = spectrum;
  return { ...state,
    spectrums: newSpectrums
  };
};

const handleBlockLines = (state, lines) => {
  const {
    grid,
    piece,
    type
  } = state;
  const newGrid = (0, _pieces.addBlockLine)(lines, grid, piece, type);
  return { ...state,
    grid: newGrid
  };
};

const gameReducer = (state, action) => {
  if (state.end) {
    return state;
  }

  switch (action.type) {
    case 'TICK':
      return handleTick(state);

    case 'LEFT':
      return handleMove(state, _pieces.moveLeft);

    case 'RIGHT':
      return handleMove(state, _pieces.moveRight);

    case 'DROP':
      return handleDrop(state, [...state.grid]);

    case 'ROTATE':
      return handleRotate(state);

    case 'GET_PIECES':
      return handlePieces(state, action.pieces);

    case 'SPEED':
      return handleDown(state);

    case 'BLOCKLINES':
      return handleBlockLines(state, action.lines);

    case 'SPECTRUM':
      return handleSpectrum(state, action);

    default:
      return state;
  }
};

exports.gameReducer = gameReducer;