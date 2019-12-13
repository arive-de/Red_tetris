const WIDTH = 10

//0123456789//
//    #     //
//    #     //
//    #     //
//    #     //
const p0 = [4, 14, 24, 34]
// r to p1 [13, 14, 15, 16]
const r0 = ([a, b, c, d]) => [a + 9, b, c - 9, d - 18]

//   ####   //
//          //
//          //
//          //
const p1 = [3, 4, 5, 6]
// r to p2 [-5, 5, 15, 25]
const r1 = ([a, b, c, d]) => [a - 8, b + 1, c + 10, d + 19]

//     #    //
//     #    //
//     #    //
//     #    //
const p2 = [5, 15, 25, 35]
// r to p3 [23, 24, 25, 26]
const r2 = ([a, b, c, d]) => [a + 18, b + 9, c, d - 9]

//   ####   //
//          //
//          //
//          //
const p3 = [3, 4, 5, 6]
// r to p0 [-16, -6, 4, 14]
const r3 = ([a, b, c, d]) => [a - 19, b - 10, c - 1, d + 8]

////////////////////////////////////////

//     #
//     o
//    ##
//
const p4 = [5, 15, 24, 25]
// r to p5 [4, 14, 15, 16]
const r4 = ([a, b, c, d]) => [a - 1, b - 1, c - 9, d - 9]

//    #
//    #o#
//
//
const p5 = [4, 14, 15, 16]
// r to p6 [5, 6, 15, 25]
const r5 = ([a, b, c, d]) => [a + 1, b - 8, c, d + 9]

//    ##
//    o
//    #
//
const p6 = [5, 6, 15, 25]
// r to p7 [14, 15, 16, 26]
const r6 = ([a, b, c, d]) => [a + 9, b + 9, c + 1, d + 1]

//    #o#
//      #
//
//
const p7 = [4, 5, 6, 16]
// r to p4 [-5, 5, 14, 15]
const r7 = ([a, b, c, d]) => [a - 9, b, c + 8, d - 1]

//////////////////////////////////////////////////////

//     #    //
//     o
//     ##
//
const p8 = [5, 15, 25, 26]
// r to p9 [14, 15, 16, 24]
const r8 = ([a, b, c, d]) => [a + 9, b, c - 9, d - 2]

//    #o#
//    #
//
//
const p9 = [4, 5, 6, 14]
// r to p10 [-6, -5, 5, 15]
const r9 = ([a, b, c, d]) => [a - 10, b - 10, c - 1, d + 1]

//    ##
//     o
//     #
//
const p10 = [4, 5, 15, 25]
// r to p11 [6, 14, 15, 16]
const r10 = ([a, b, c, d]) => [a + 2, b + 9, c, d - 9]

//      #
//    #o#
//
//
const p11 = [6, 14, 15, 16]
// r to p8 [5, 15, 25, 26]
const r11 = ([a, b, c, d]) => [a - 1, b + 1, c + 10, d + 10]

////////////////////////////////////////////////

//    ##
//    ##
//
//
const p12 = [4, 5, 14, 15]
// r to p13 [4, 5, 14, 15]
const r12 = ([a, b, c, d]) => [a, b, c, d]

//    ##
//    ##
//
//
const p13 = [4, 5, 14, 15]
// r to p14 [4, 5, 14, 15]
const r13 = ([a, b, c, d]) => [a, b, c, d]

//    ##
//    ##
//
//
const p14 = [4, 5, 14, 15]
// r to p15 [4, 5, 14, 15]
const r14 = ([a, b, c, d]) => [a, b, c, d]

//    ##
//    ##
//
//
const p15 = [4, 5, 14, 15]
// r to p12 [4, 5, 14, 15]
const r15 = ([a, b, c, d]) => [a, b, c, d]

//////////////////////////////////////////////////

//   #
//   #o
//    #
//
const p16 = [4, 14, 15, 25]
// r to p17 [5, 6, 14, 15]
const r16 = ([a, b, c, d]) => [a + 1, b - 8, c - 1, d - 10]

//     ##   //
//    #o    //
//          //
//          //
const p17 = [5, 6, 14, 15]
// r to p18 [5, 15, 16, 26]
const r17 = ([a, b, c, d]) => [a, b + 9, c + 2, d + 11]

//    #
//    o#
//     #
//
const p18 = [4, 14, 15, 25]
// r to p19 [14, 15, 23, 24]
const r18 = ([a, b, c, d]) => [a + 10, b + 1, c + 8, d - 1]

//     o#   //
//    ##    //
//          //
//          //
const p19 = [5, 6, 14, 15]
// r to p16 [-6, 4, 5, 15]
const r19 = ([a, b, c, d]) => [a - 11, b - 2, c - 9, d]

////////////////////////////////////////////////////////

//    #o#   //
//     #    //
//          //
//          //
const p20 = [4, 5, 6, 15]
// r to p21 [-5, 4, 5, 15]
const r20 = ([a, b, c, d]) => [a - 9, b - 1, c - 1, d]

//     #
//    #o
//     #
//
const p21 = [5, 14, 15, 25]
// r to p22 [5, 14, 15, 16]
const r21 = ([a, b, c, d]) => [a, b, c, d - 9]

//     #
//    #o#
//
//
const p22 = [5, 14, 15, 16]
// r to p23 [5, 15, 16, 25]
const r22 = ([a, b, c, d]) => [a, b + 1, c + 1, d + 9]

//    #
//    o#
//    #
//
const p23 = [5, 15, 16, 25]
// r to p20 [14, 15, 16, 25]
const r23 = ([a, b, c, d]) => [a + 9, b, c, d]

/////////////////////////////////////////////////

//     #
//    o#
//    #
//
const p24 = [5, 14, 15, 24]
// r to p25 [13, 14, 24, 25]
const r24 = ([a, b, c, d]) => [a + 8, b , c + 9, d + 1]

//    #o
//     ##
//
//
const p25 = [4, 5, 15, 16]
// r to p26 [-5, 4, 5, 14]
const r25 = ([a, b, c, d]) => [a - 9, b - 1, c - 10, d - 2]

//     #
//    #o
//    #
//
const p26 = [5, 14, 15, 24]
// r to p27 [4, 5, 15, 16]
const r26 = ([a, b, c, d]) => [a - 1, b - 9, c, d - 8]

//    ##
//     o#
//
//
const p27 = [4, 5, 15, 16]
// r to p24 [6, 15, 16, 25]
const r27 = ([a, b, c, d]) => [a + 2, b + 10, c + 1, d + 9]

/////////////////////////////////////////////////

const pieces = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, p26, p27]

const rotationTypes = type => [1, 2, 3, 0, 5, 6, 7, 4, 9, 10, 11, 8, 13, 14, 15, 12, 17, 18, 19, 16, 21, 22, 23, 20, 25, 26, 27, 24][type]

const rotationFuncs = (piece, type) => [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27][type](piece)

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

const addBlockLine = (n, grid, piece, type) => {
  let newGrid = [...grid, ...Array(10 * n).fill(-1)]
  piece.forEach(c => { newGrid[c] = 0 })
  newGrid = newGrid.slice(n * 10)
  piece.forEach(c => { newGrid[c] = type + 1})

  return newGrid
}

const fillHoles = (grid, n) => {
  let flag = false
  Array(20).fill(0).forEach((x, i) => {
    const value = grid[n + i * 10]
    if (value < 0) {
      return
    }
    if (flag) {
      grid[n + i * 10] = 1
    }
    if (!flag && value) {
      flag = true
    }
  })
}

const getSpectrum = (grid, piece) => {
  const newGrid = grid.map(x => x > 0 ? 1 : x < 0 ? -1 : 0)
  piece.forEach(c => { newGrid[c] = 0 })
  Array(10).fill(0).forEach((i, col) => { fillHoles(newGrid, col) })
  return newGrid
}

const dropBottom = (piece, grid, height=0) => {
  const [ok, next] = canDrop(piece, grid)
  if (!ok) {
    return [piece, height]
  }
  return dropBottom(next, grid, height + 1)
}

const updateFullLine = (grid, piece, type) => {
  const newGrid = []
  let nbLine = 0
  Array(20).fill(0).forEach((x, i) => {
    const line = grid.slice(i * 10, i * 10 + 10)
    if (line.every(c => c > 0)) {
      newGrid.unshift(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      nbLine = nbLine + 1
      return
    }
    newGrid.push(...line)
  })
  piece.forEach(c => { newGrid[c] = type + 1 })
  return [newGrid, nbLine]
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
  updateFullLine,
}
