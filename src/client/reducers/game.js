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
  updateFullLine,
} from '../utils/pieces'

const handleTick = (state) => {
  const { type, piece, pieces, grid, spectrums } = state
  const [ok, nextPiece] = canDrop(piece, grid)

  if (!ok) {
    if (startPieces[pieces[0]].some(c => state.grid[c] !== 0)) {
      console.log('GAMEOVER !!')
      return {
        ...state,
        piece: [],
        end: true,
      }
    }
    const [newGrid, nbLine] = updateFullLine(grid)
    return {
      ...state,
      type: pieces[0],
      piece: startPieces[pieces[0]],
      pieces: pieces.slice(1),
      grid: updateGrid(startPieces[pieces[0]], startPieces[pieces[0]], pieces[0], newGrid),
      lines: nbLine,
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

const handlePieces = (state, newPieces) => {
  const nextState = {
    ...state,
    pieces: [...state.pieces, ...newPieces]
  }
  if (state.piece.length) {
    return nextState
  }
  return {
    ...nextState,
    type: nextState.pieces[0],
    piece: startPieces[nextState.pieces[0]],
    pieces: nextState.pieces.slice(1),
    grid: updateGrid(startPieces[nextState.pieces[0]], startPieces[nextState.pieces[0]], nextState.pieces[0], nextState.grid),
  }
}

const handleRotate = (state) => {
  const { type, piece, grid } = state
  const nextType = rotationTypes(type)
  const nextPiece = rotationFuncs(piece, type)
  if (!canFit(piece, nextPiece, grid)) {
    return state
  }
  return {
    ...state,
    grid: updateGrid(piece, nextPiece, nextType, grid),
    piece: nextPiece,
    type: nextType,
  }
}

const gameReducer = (state, action) => {
  // console.log('gameReducer', state, action)
  if (state.end) {
    return state
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
    return handleRotate(state)
  case 'GET_PIECES':
    return handlePieces(state, action.pieces)
  case 'SPEED':
    return handleDown(state)
  case 'ADD_LINES':
    return { ...state }
  default:
    return state
  }
}

export { gameReducer }
