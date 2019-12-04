const debug = require('debug')('∆:controller room spec')
const assert = require('assert')
const Room = require('../../models/Room')
const { connect, disconnect  } = require('../../helpers.spec')
const { createRoom, joinRoom, leaveRoom } = require('./room')

describe('Room Controller', function() {
  disconnect()
  connect()
  let testRoomId

  it('creates a room', function(done) {

    createRoom('lox', 'Classic', (err, data) => {
      if (err) {
        debug(err)
      }
      testRoomId = data.roomId
      Room.findOne({ roomId: data.roomId}).then(data => {
        assert(data.players[0] === 'lox')
        assert(data.leaderBoard[0] === 0)
        assert(data.type === 'Classic')
        done()
      })
    })
  })

  it('joins a room', function(done) {

    joinRoom('bob', testRoomId, (err, data) => {
      if (err) {
        debug(err)
      }
      Room.findOne({ roomId: data.roomId }).then(data => {
        assert(data.players[1] === 'bob')
        assert(data.leaderBoard[1] === 0)
        done()
      })
    })
  })

  it('leaves a room', function(done) {

    leaveRoom('lox', testRoomId, (err, data) => {

      Room.findOne({ roomId: data.roomId }).then(data => {
        assert(data.players[0] === 'bob')
        assert(data.players.length === 1)
        assert(data.leaderBoard[0] === 0)
        assert(data.leaderBoard.length === 1)
        done()
      })
    })
  })

  it('leaves unknown room', function(done) {
    leaveRoom('lox', testRoomId, (err, data) => {
        Room.findOne({ roomId: 'fakeId' }).then(data => {
          assert(data === null)
          done()
        })
    })
  })

  it('join full room', function(done) {
    const fullRoom =  new Room({
      players: ['jo', 'yo', 'mo', 'no'],
      roomId: 'xxma',
      type: 'Classic',
      running: false,
    })
    fullRoom.save().then(data => {
      joinRoom('bibi', 'xxma', (err, data) => {
        assert(err === 'room is full')
        done()
      })
    })
  })
})

