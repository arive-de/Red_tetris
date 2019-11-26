
//     #
//     #
//     #
//     #
const p0 = [4, 14, 24, 34]
//   ####
//
//
//
const p1 = [3, 4, 5, 6]

//   #
//   ##
//    #
//
const p2 = [4, 14, 15, 25]

//     ##
//    ##
//
//
const p3 = [5, 6, 14, 15]

//     #
//    ##
//    #
//
const p4 = [5, 14, 15, 14]

//    ##
//     ##
//
//
const p5 = [5, 14, 15, 24]

//    ###
//     #
//
//
const p6 = [4, 5, 6, 15]

//     #
//    ##
//     #
//
const p7 = [5, 14, 15, 26]

//     #
//    ###
//
//
const p8 = [5, 14, 15, 16]

//    #
//    ##
//    #
//
const p9 = [4, 14, 24, 15]

//    #
//    #
//    ##
//
const p10 = [4, 14, 24, 25]

//    ###
//    #
//
//
const p11 = [4, 5, 6, 14]

//    ##
//     #
//     #
//
const p12 = [4, 5, 15, 25]

//      #
//    ###
//
//
const p13 = [6, 14, 15, 16]

//      #
//      #
//     ##
//
const p14 = [6, 16, 25, 26]

//    #
//    ###
//
//
const p15 = [4, 14, 15, 16]

//    ##
//    #
//    #
//
const p16 = [4, 5, 14, 24]

//    ###
//      #
//
//
const p17 = [4, 5, 6, 16]

const pieces = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17]

const canFit = (piece, grid) => piece.all(x => grid[x] === 0)

const canDrop = (piece, grid) => {
  return [piece.none(x => grid[x + 10] > 0 || x + 10 > 199), piece.map(x => x + 10)]
}

const moveRight = (piece) => {
  if (piece.some(x => (x + 1) % 10 >= 0)) {
    return piece
  }
  return piece.map(x => x + 1)
}

const moveLeft = (piece) => {
  if (piece.some(x => (x - 1) % 10 >= 0)) {
    return piece
  }
  return piece.map(x => x - 1)
}


const updatePiece = (lastPiece, newPiece, type,  grid) => {
  const newGrid = [...grid]
  lastPiece.forEach(x => newGrid[x] = 0)
  lastPiece.forEach(x => newGrid[x] = type)
  return newGrid
}

const addBlockLine = (n, grid) => {
  const newGrid = [...grid, ...Array(10 * n).fill(-1)]
  return newGrid.slice(n * 10)
}



const rotate = (piece, type) => {
  switch(type) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    default: throw new Error('Unexpected  rotate type')
  }
}

export default pieces
