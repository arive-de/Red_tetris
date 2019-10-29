const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assert = require('assert')
const Room = require('../../models/Room')
const { connect, disconnect  } = require('../../helpers.spec')
const { createRoom, joinRoom, leaveRoom } = require('./room')

connect()

describe('Room Controller', function() {
  let testRoomId = 'xx'

  it('creates a room', function(done) {

    createRoom('lox', 'Classic', (err, data) => {
      if (err) {
        console.log(err)
      }
      testRoomId = data.roomId
      Room.findOne({ roomId: data.roomId}).then(data => {
        assert(data.players[0] === 'lox')
        assert(data.type === 'Classic')
        done()
      })
    })
  })

  it('joins a room', function(done) {

    joinRoom('bob', testRoomId, (err, data) => {
      if (err) {
        console.log(err)
      }
      Room.findOne({ roomId: data.roomId }).then(data => {
        assert(data.players[1] === 'bob')
        done()
      })
    })
  })

  it('leaves a room', function(done) {

    leaveRoom('lox', testRoomId, (err, data) => {
      
      if (err) {
        console.log(err)
      }
      Room.findOne({ roomId: data.roomId }).then(data => {
        assert(data.players[0] === 'bob')
        assert(data.players.length === 1)
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

disconnect()
