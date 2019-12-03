const WIDTH = 10


//    #     //
//    o     //
//    #     //
//    #     //
const p0 = [4, 14, 24, 34]

// r to p1 [13, 14, 15, 16]
const r0 = ([a, b, c, d]) => [a + 9, b, c - 9, d - 18]

//   #o##    //
//           //
//           //
//           //
const p1 = [3, 4, 5, 6]

// r to p0 [-6, 4, 14, 24]
const r1 = ([a, b, c, d]) => [a - 9, b, c + 9, d + 18]

//   #
//   #o
//    #
//
const p2 = [4, 14, 15, 25]

// r to p3 [5, 6, 14, 15]
const r2 = ([a, b, c, d]) => [a + 1, b - 8, c - 1, d - 10]

//     o#   //
//    ##    //
//          //
//          //
const p3 = [5, 6, 14, 15]

// r to p2 [-5, 5, 6, 16]
const r3 = ([a, b, c, d]) => [a - 10, b - 1, c - 8, d + 1]

//     #
//    o#
//    #
//
const p4 = [5, 14, 15, 24]

// r to p5 [14, 15, 25, 26]
const r4 = ([a, b, c, d]) => [a + 9, b + 1, c + 10, d + 2]

//    #o
//     ##
//
//
const p5 = [4, 5, 15, 16]

// r to p4 [-5, 4, 5, 14]
const r5 = ([a, b, c, d]) => [a - 9, b - 1, c - 10, d - 2]

//    #o#   //
//     #    //
//          //
//          //
const p6 = [4, 5, 6, 15]

// r to p7 [-5, 4, 5, 15]
const r6 = ([a, b, c, d]) => [a - 9, b - 1, c - 1, d]

//     #
//    #o
//     #
//
const p7 = [5, 14, 15, 25]

// r to p8 [5, 14, 15, 16]
const r7 = ([a, b, c, d]) => [a, b, c, d - 9]

//     #
//    #o#
//
//
const p8 = [5, 14, 15, 16]

// r to p9 [5, 15, 16, 25]
const r8 = ([a, b, c, d]) => [a, b + 1, c + 1, d + 9]

//    #
//    o#
//    #
//
const p9 = [5, 15, 16, 25]

// r to p6 [14, 15, 16, 25]
const r9 = ([a, b, c, d]) => [a + 9, b, c, d]

//     #    //
//     o
//     ##
//
const p10 = [5, 15, 25, 26]

// r to p11 [14, 15, 16, 24]
const r10 = ([a, b, c, d]) => [a + 9, b, c - 9, d - 2]

//    #o#
//    #
//
//
const p11 = [4, 5, 6, 14]

// r to p12 [-6, -5, 5, 15]
const r11 = ([a, b, c, d]) => [a - 10, b - 10, c - 1, d + 1]

//    ##
//     o
//     #
//
const p12 = [4, 5, 15, 25]

// r to p13 [6, 14, 15, 16]
const r12 = ([a, b, c, d]) => [a + 2, b + 9, c, d - 9]

//      #
//    #o#
//
//
const p13 = [6, 14, 15, 16]

// r to p10 [5, 15, 25, 26]
const r13 = ([a, b, c, d]) => [a - 1, b + 1, c + 10, d + 10]

//     #
//     o
//    ##
//
const p14 = [5, 15, 24, 25]

// r to p15 [4, 14, 15, 16]
const r14 = ([a, b, c, d]) => [a - 1, b - 1, c - 9, d - 9]

//    #
//    #o#
//
//
const p15 = [4, 14, 15, 16]

// r to p16 [5, 6, 15, 25]
const r15 = ([a, b, c, d]) => [a + 1, b - 8, c, d + 9]

//    ##
//    o
//    #
//
const p16 = [5, 6, 15, 25]

// r to p17 [14, 15, 16, 26]
const r16 = ([a, b, c, d]) => [a + 9, b + 9, c + 1, d + 1]

//    #o#
//      #
//
//
const p17 = [4, 5, 6, 16]

// r to p14 [-5, 5, 14, 15]
const r17 = ([a, b, c, d]) => [a - 9, b, c + 8, d - 1]

const pieces = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17]

const rotationTypes = type => [1, 0, 3, 2, 5, 4, 7, 8, 9, 6, 11, 12, 13, 10, 15, 16, 17, 14][type]

const rotationFuncs = (piece, type) => [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17][type](piece)

const canFit = (lastPiece, piece, grid) => {
  const pieceFitInGrid = piece.every(x => x < 200 && x >= 0 && (grid[x] === 0 || lastPiece.indexOf(x) !== -1))
  const blockWall = !([...piece, ...lastPiece].filter(x => x % 10 === 0).length > 0 && [...piece, ...lastPiece].filter(x => (x + 1) % 10 === 0).length > 0)
  return (pieceFitInGrid && blockWall)
}

const canDrop = (piece, grid) => {
  const nextPiece = piece.map(x => x + 10)
  const type = grid[piece[0]]
  piece.forEach(x => grid[x] = 0)
  const ok = !piece.some(x => x + 10 > 199 || grid[x + 10] !== 0)
  piece.forEach(x => grid[x] = type)
  return [ok, nextPiece]
}

const moveRight = (piece) => piece.map(x => x + 1)

const moveLeft = (piece) => piece.map(x => x - 1)

const updateGrid = (oldPiece, newPiece, type, grid) => {
  const newGrid = [...grid]
  oldPiece.forEach(x => newGrid[x] = 0)
  newPiece.forEach(x => newGrid[x] = type + 1)
  return newGrid
}

const addBlockLine = (n, grid) => {
  const newGrid = [...grid, ...Array(10 * n).fill(-1)]
  return newGrid.slice(n * 10)
}

const getSpectrum = grid => {
  // Array(10).map(a, j => Array(20).map((x, i) => grid[j * 10 + i]).findIndex(s => s <= 0))
  return grid.map(x => x > 0 ? 1 : 0)
}

const dropBottom = (piece, grid) => {
  const [ok, next] = canDrop(piece, grid)
  if (!ok) {
    return piece
  }
  return dropBottom(next, grid)
}

const gameOver = (piece, grid) => {
  console.log('gameover', canDrop(piece, grid), piece.some(x => x < 10))
  return (!canDrop(piece, grid)[0] && piece.some(x => x < 10))
}

export {
  pieces,
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
}
