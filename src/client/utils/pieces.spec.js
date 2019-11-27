const assert = require('assert')

import {
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
} from  './pieces'

describe('pieces functions', () => {

  const grid = Array(200).fill(0)

  it('pieces start position', (done) => {
    const [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17] = pieces
    expect(p0).to.deep.equal([4, 14, 24, 34])
    expect(p1).to.deep.equal([3, 4, 5, 6])
    expect(p2).to.deep.equal([4, 14, 15, 25])
    expect(p3).to.deep.equal([5, 6, 14, 15])
    expect(p4).to.deep.equal([5, 14, 15, 24])
    expect(p5).to.deep.equal([4, 5, 15, 16])
    expect(p6).to.deep.equal([4, 5, 6, 15])
    expect(p7).to.deep.equal([5, 14, 15, 25])
    expect(p8).to.deep.equal([5, 14, 15, 16])
    expect(p9).to.deep.equal([5, 15, 16, 25])
    expect(p10).to.deep.equal([5, 15, 25, 26])
    expect(p11).to.deep.equal([4, 5, 6, 14])
    expect(p12).to.deep.equal([4, 5, 15, 25])
    expect(p13).to.deep.equal([6, 14, 15, 16])
    expect(p14).to.deep.equal([5, 15, 24, 25])
    expect(p15).to.deep.equal([4, 14, 15, 16])
    expect(p16).to.deep.equal([5, 6, 15, 25])
    expect(p17).to.deep.equal([4, 5, 6, 16])
    done()    
  })

  it('pieces types mapping', (done) => {
    expect(rotationTypes(0)).to.equal(1)
    expect(rotationTypes(1)).to.equal(0)
    expect(rotationTypes(2)).to.equal(3)
    expect(rotationTypes(3)).to.equal(2)
    expect(rotationTypes(4)).to.equal(5)
    expect(rotationTypes(5)).to.equal(4)
    expect(rotationTypes(6)).to.equal(7)
    expect(rotationTypes(7)).to.equal(8)
    expect(rotationTypes(8)).to.equal(9)
    expect(rotationTypes(9)).to.equal(6)
    expect(rotationTypes(10)).to.equal(11)
    expect(rotationTypes(11)).to.equal(12)
    expect(rotationTypes(12)).to.equal(13)
    expect(rotationTypes(13)).to.equal(10)
    expect(rotationTypes(14)).to.equal(15)
    expect(rotationTypes(15)).to.equal(16)
    expect(rotationTypes(16)).to.equal(17)
    expect(rotationTypes(17)).to.equal(14)
    done()    
  })

  it('rotation p0 ok', (done) => {
    const type = 0
    const piece = [
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p0 cannot fit v1', (done) => {
    const type = 0
    const piece = [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p0 cannot fit v2', (done) => {
    const type = 0
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p1 ok', (done) => {
    const type = 1
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p1 cannot fit', (done) => {
    const type = 1
    const piece = [
      1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p2 ok', (done) => {
    const type = 2
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 0, 0, 0
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p2 cannot fit', (done) => {
    const type = 2
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p3 ok', (done) => {
    const type = 3
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p3 cannot fit', (done) => {
    const type = 3
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p4 ok', (done) => {
    const type = 4
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p4 cannot fit', (done) => {
    const type = 4
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p5 ok', (done) => {
    const type = 5
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p5 cannot fit', (done) => {
    const type = 5
    const piece = [
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p6 ok', (done) => {
    const type = 6
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p6 cannot fit', (done) => {
    const type = 6
    const piece = [
      0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p7 ok', (done) => {
    const type = 7
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p7 cannot fit', (done) => {
    const type = 7
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p8 ok', (done) => {
    const type = 8
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p8 cannot fit', (done) => {
    const type = 8
    const piece = [181, 190, 191, 192]
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p9 ok', (done) => {
    const type = 9
    const piece = [
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p9 cannot fit', (done) => {
    const type = 9
    const piece = [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p10 ok', (done) => {
    const type = 10
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p10 cannot fit', (done) => {
    const type = 10
    const piece = [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p11 ok', (done) => {
    const type = 11
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p11 cannot fit', (done) => {
    const type = 11
    const piece = [
      0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p12 ok', (done) => {
    const type = 12
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p12 cannot fit', (done) => {
    const type = 12
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p13 ok', (done) => {
    const type = 13
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p13 cannot fit', (done) => {
    const type = 13
    const piece = [189, 197, 198, 199]
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p14 ok', (done) => {
    const type = 14
    const piece = [
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p14 cannot fit', (done) => {
    const type = 14
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p15 ok', (done) => {
    const type = 15
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p15 cannot fit', (done) => {
    const type = 15
    const piece = [184, 194, 195, 196]
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p16 ok', (done) => {
    const type = 16
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p16 cannot fit', (done) => {
    const type = 16
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('rotation p17 ok', (done) => {
    const type = 17
    const piece = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    const expectedPiece = [
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(rotationFuncs(piece, type)).to.deep.equal(expectedPiece)
    done()
  })
  it('rotation p17 cannot fit', (done) => {
    const type = 17
    const piece = [
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ].map((x, i) => x === 1 ? i : -42).filter(x => x >= 0)
    expect(canFit(piece, rotationFuncs(piece, type), grid)).to.equal(false)
    done()
  })
  it('addblockline 1', (done) => {
    const grid = addBlockLine(1, Array(20).fill(0))
    expect(grid.length).to.equal(20)
    expect(grid.slice(10)).to.deep.equal(Array(10).fill(-1))
    done()
  })
  it('addblockline 3', (done) => {
    const grid = addBlockLine(3, Array(100).fill(0))
    expect(grid.length).to.equal(100)
    expect(grid.slice(70)).to.deep.equal(Array(30).fill(-1))
    done()
  })
  it('getSpectrum v1', (done) => {
    const grid = Array(200).fill(0)
    const spec = getSpectrum(grid)
    expect(spec).to.deep.equal(Array(200).fill(0))
    expect(spec.length).to.equal(200)
    done()
  })
  it('getSpectrum v2', (done) => {
    const grid = [...Array(100).fill(0), ...Array(100).fill(42)]
    const spec = getSpectrum(grid)
    expect(spec).to.deep.equal([...Array(100).fill(0), ...Array(100).fill(1)])
    expect(spec.length).to.equal(200)
    done()
  })
  it('getSpectrum v3', (done) => {
    const grid = [...Array(100).fill(0), ...Array(50).fill(42), ...Array(50).fill(8)]
    const spec = getSpectrum(grid)
    expect(spec).to.deep.equal([...Array(100).fill(0), ...Array(100).fill(1)])
    expect(spec.length).to.equal(200)
    done()
  })
  it('move right', (done) => {
    const piece = [1,2, 3, 4]
    const expectedPiece = [2, 3, 4, 5]
    expect(piece.length).to.equal(4)
    expect(moveRight(piece)).to.deep.equal(expectedPiece)
    done()
  })
  it('move left', (done) => {
    const piece = [10, 20, 30, 40]
    const expectedPiece = [9, 19, 29, 39]
    expect(piece.length).to.equal(4)
    expect(moveLeft(piece)).to.deep.equal(expectedPiece)
    done()
  })
  it('can drop false bottom', (done) => {
    const grid = Array(200).fill(0)
    const piece = [186, 187, 188, 197]
    expect(canDrop(piece, grid)).to.deep.equal([false, [196, 197, 198, 207]])
    done()
  })
  it('can drop true', (done) => {
    const grid = Array(200).fill(0)
    const piece = [186, 187, 188, 177]
    expect(canDrop(piece, grid)).to.deep.equal([true, [196, 197, 198, 187]])
    done()
  })
  it('can drop false piece', (done) => {
    const grid = Array(200).fill(0)
    grid[197] = 1
    const piece = [186, 187, 188, 177]
    expect(canDrop(piece, grid)).to.deep.equal([false, [196, 197, 198, 187]])
    done()
  })
  it('update grid', (done) => {
    const grid = [2, 2, 2, 2, ...Array(196).fill(0)]
    const oldPiece = [0, 1, 2, 3]
    const newPiece = [1, 2, 3, 4]
    const type = 1

    expect(updateGrid(oldPiece, newPiece, type, grid)).to.deep.equal([0, 2, 2, 2, 2, ...Array(195).fill(0)])
    done()
  })
  it('drop bottom floor', (done) => {
    const grid = Array(200).fill(0)
    const piece = [1, 2, 3, 4]

    expect(dropBottom(piece, grid)).to.deep.equal([191, 192, 193, 194])
    done()
  })
  it('drop bottom middle', (done) => {
    const grid = Array(200).fill(0)
    grid[101] = 1
    const piece = [1, 2, 3, 4]

    expect(dropBottom(piece, grid)).to.deep.equal([91, 92, 93, 94])
    done()
  })
})