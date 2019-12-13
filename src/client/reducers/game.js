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
  dropBottom,
  updateFullLine,
} from '../utils/pieces'

const scoring = [40, 100, 300, 1200]

const handleTick = (state) => {
  const { type, piece, pieces, grid } = state
  const [ok, nextPiece] = canDrop(piece, grid)

  if (!ok) {
    if (startPieces[pieces[0]].some(c => state.grid[c] !== 0)) {
      return {
        ...state,
        piece: [],
        end: true,
      }
    }
    const [newGrid, nbLine] = updateFullLine(grid, startPieces[pieces[0]], pieces[0])
    return {
      ...state,
      type: pieces[0],
      piece: startPieces[pieces[0]],
      pieces: pieces.slice(1),
      grid: newGrid,
      lines: nbLine,
      score: nbLine > 0 ? state.score + (scoring[nbLine - 1] * state.lvl) : state.score,
    }
  }
  return {
    ...state,
    piece: nextPiece,
    grid: updateGrid(piece, nextPiece, type, grid),
  }
}

const handleDown = (state) => {
  const { type, piece, grid } = state
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

const handleDrop = (state, arg) => {
  const { type, piece, pieces, grid } = state
  const [nextPiece, height] = dropBottom(piece, arg)
  if (!canFit(piece, nextPiece, grid)) {
    return state
  }
  if (startPieces[pieces[0]].some(c => nextPiece.indexOf(c) !== -1)) {
    return {
      ...state,
      piece: [],
      end: true,
    }
  }
  const [newGrid, nbLine] = updateFullLine(updateGrid(piece, nextPiece, type, grid), startPieces[pieces[0]], pieces[0])
  return {
    ...state,
    type: pieces[0],
    piece: startPieces[pieces[0]],
    pieces: pieces.slice(1),
    grid: newGrid,
    lines: nbLine,
    score: height + (nbLine > 0 ? state.score + scoring[nbLine - 1] : state.score),
  }
}

const handlePieces = (state, newPieces) => {
  const nextState = {
    ...state,
    pieces: [...state.pieces, ...newPieces],
  }
  if (state.piece.length) {
    nextState.lvl = state.lvl + 1
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

const handleSpectrum = (state, { index, spectrum }) => {
  const newSpectrums = [...state.spectrums]
  newSpectrums[index] = spectrum
  return { ...state, spectrums: newSpectrums }
}

const handleBlockLines = (state, lines) => {
  const { grid, piece, type } = state
  const newGrid = addBlockLine(lines, grid, piece, type)
  return { ...state, grid: newGrid }
}

const gameReducer = (state, action) => {
  if (state.end && action.type !== 'RESET') {
    return state
  }
  console.log('GAME', action.type)
  switch (action.type) {
  case 'TICK':
    return handleTick(state)
  case 'LEFT':
    return handleMove(state, moveLeft)
  case 'RIGHT':
    return handleMove(state, moveRight)
  case 'DROP':
    return handleDrop(state, [...state.grid])
  case 'ROTATE':
    return handleRotate(state)
  case 'GET_PIECES':
    return handlePieces(state, action.pieces)
  case 'SPEED':
    return handleDown(state)
  case 'BLOCKLINES':
    return handleBlockLines(state, action.lines)
  case 'SPECTRUM':
    return handleSpectrum(state, action)
  case 'RESET':
    return {
      type: 0,
      piece: [],
      pieces: [],
      grid: [...Array(200).fill(0)],
      spectrums: [0, 0, 0].map(() => Array(200).fill(0)),
      lines: 0,
      end: false,
      score: 0,
      lvl: 0,
    }
  default:
    return state
  }
}

export default gameReducer
