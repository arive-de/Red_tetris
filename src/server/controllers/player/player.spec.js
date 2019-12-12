const debug = require('debug')('∆:controller player spec')
const assert = require('assert')
const User = require('../../models/User')
const Room = require('../../models/Room')
const Player = require('./player')
const { connect, disconnect  } = require('../../helpers.spec')

describe('#Player Controller', function() {
  connect()
  disconnect()
  before(function(done) {
    Room.create([{
      roomId: 'aaaa',
      type: 'Classic',
      players: ['bib', 'bob', 'prout', 'toupie'],
      running: false,
      leader: 'bib',
    },
    {
      roomId: 'bbbb',
      type: 'Classic',
      players: ['Joe'],
      running: false,
      leader: 'Joe',
    }]).then(() => {
      User.create([{
        username: 'Joe',
      }, {
        username: 'bib',
      }, {
        username: 'alone',
      }])
    }).then(() => {
      done()
    })
  })

  it('create a new player', function(done) {
    Player.create('dodo', 109234877, (err) => {
      assert(err === undefined)
      User.findOne({ username: 'dodo' }).then(u => {
        assert(u.username === 'dodo')
        done()
      })
    })
  })

  it('create player that already exists', function(done) {
    Player.create('dodo', 109234877, (err) => {
      assert(err === 'user already exists')
      done()
    })
  })

  it('delete a player that does not exist', function(done) {
    Player.remove('unknown', null, err => {
      assert(err === 'user doesn\'t exist in db')
      done()
    })
  })

  it('delete a player that exists but without room', function(done) {
    Player.remove('alone', null, err => {
      assert(err === 'can not found room in db')
      done()
    })
  })

  it('delete a player that exists with an actual room', function(done) {
    Player.remove('bib', 'aaaa', err => {
      assert(err === undefined)
      Room.findOne({ roomId: 'aaaa' }).then(r => {
        assert(r.players.indexOf('bib') === -1)
        User.findOne({ username: 'bib' }).then(u => {
          assert(u === null)
          done()
        })
      })
    })
  })

  it('delete a player that exists with an actual room and the last player of the room', function(done) {
    Player.remove('Joe', 'bbbb', err => {
      assert(err === undefined)
      Room.findOne({ roomId: 'bbbb' }).then(r => {
        assert(r === null)
        User.findOne({ username: 'Joe' }).then(u => {
          console.log('eee', u)
          assert(u === null)
          done()
        })
      })
    })
  })

  after(function(done) {
    done()
  })
})
