const mongoose = require('mongoose')
const Schema = mongoose.Schema
const assert = require('assert')
const User = require('../../models/User')
const Room = require('../../models/Room')

const { connect, disconnect  } = require('../../helpers.spec')
const { createByUrl } = require('./url')

describe('Url Controller', function() {
  disconnect()
  connect()
  it('creates a user and a room', function(done) {
    createByUrl('lox', 'socketId', 'roomId', (err, data) => {

      User.findOne({ username: 'lox' }).then(data => {
        assert(data.username === 'lox')
      })
      Room.findOne({ roomId: 'roomId'}).then(data => {
        assert(data.players[0] === 'lox')
        assert(data.type === 'Classic')
        done()
      })
    })
  })

  it('can\'t create user', function(done) {
    createByUrl('lox', 'socketId', 'roomId', (err, data) => {

        User.findOne({ username: 'lox' }).then(data => {
          assert(err === 'username already exists')
          done()
        })
    })
  })
})