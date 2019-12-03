import {
  pieces as startPieces,
  rotationTypes,
  rotationFuncs,
  canFit,
  canDrop,
  moveRight,
  moveLeft,
  updateGrid,
  addBlockLine,
  getSpectrum,
  dropBottom,
  gameOver,
} from '../utils/pieces'

const handleTick = (state) => {
  if (state.piece === null) {
    return state
  }
  const { type, piece, pieces, grid, spectrums } = state
  const [ok, nextPiece] = canDrop(piece, grid)
  if (!ok) {
    return {
      ...state,
      type: pieces[0],
      piece: startPieces[pieces[0]],
      pieces: pieces.slice(1),
      grid: updateGrid(startPieces[pieces[0]], startPieces[pieces[0]], pieces[0], grid),
    }
  }
  return {
    ...state,
    piece: nextPiece,
    grid: updateGrid(piece, nextPiece, type, grid),
  }
}

const handleDown = (state) => {
  const { type, piece, pieces, grid, spectrums } = state
  const [ok, nextPiece] = canDrop(piece, grid)
  if (!ok) {
    return state
  }
  return {
    ...state,
    piece: nextPiece,
    grid: updateGrid(piece, nextPiece, type, grid),
  }
}

const handleMove = (state, fn, arg) => {
  const { type, piece, grid } = state
  const nextPiece = fn(piece, arg)
  if (!canFit(piece, nextPiece, grid)) {
    return state
  }
  return {
    ...state,
    grid: updateGrid(piece, nextPiece, type, grid),
    piece: nextPiece,
  }
}

const handleStart = (state) => {
  if (state.piece !== null) {
    return state
  }
  return {
    ...state,
    type: state.pieces[0],
    piece: startPieces[state.pieces[0]],
    pieces: state.pieces.slice(1),
    grid: updateGrid(startPieces[state.pieces[0]], startPieces[state.pieces[0]], state.pieces[0], state.grid),
  }
}

const gameReducer = (state, action) => {
  console.log('gameReducer', state, action)
  if (state.end) {
    return state
  }
  if (state.piece !== null && gameOver(state.piece, state.grid)) {
    return {
      ...state,
      piece: null,
      end: true,
    }
  }
  switch (action.type) {
  case 'TICK':
    return handleTick(state)
  case 'LEFT':
    return handleMove(state, moveLeft)
  case 'RIGHT':
    return handleMove(state, moveRight)
  case 'DROP':
    return handleMove(state, dropBottom, [...state.grid])
  case 'ROTATE':
    return { ...state }
  case 'GET_PIECES':
    return { ...state, pieces: [...state.pieces, ...action.pieces] }
  case 'SPEED':
    return handleDown(state)
  case 'ADD_LINES':
    return { ...state }
  case 'START':
    return handleStart(state)
  default:
    return state
  }
}

export { gameReducer }
