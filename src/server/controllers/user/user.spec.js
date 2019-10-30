const assert = require('assert')
const User = require('../../models/User')
const Room = require('../../models/Room')
const { createUser, deleteUser } = require('./user')
const { connect, disconnect  } = require('../../helpers.spec')


describe('#User Controller', function() {
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

  it('create a new user', function(done) {
    createUser('dodo', 109234877, (err) => {
      assert(err === undefined)
      User.findOne({ username: 'dodo' }).then(u => {
        assert(u.username === 'dodo')
        done()
      })
    })
  })

  it('create user that already exists', function(done) {
    createUser('dodo', 109234877, (err) => {
      assert(err === 'user already exists')
      done()
    })
  })

  it('delete a user that does not exist', function(done) {
    deleteUser('unknown', null, err => {
      assert(err === 'user doesn\'t exist in db')
      done()
    })
  })

  it('delete a user that exists but without room', function(done) {
    deleteUser('alone', null, err => {
      assert(err === 'can not found room in db')
      done()
    })
  })

  it('delete a user that exists with an actual room', function(done) {
    deleteUser('bib', 'aaaa', err => {
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

  it('delete a user that exists with an actual room and the last person of the room', function(done) {
    deleteUser('Joe', 'bbbb', err => {
      assert(err === undefined)
      Room.findOne({ roomId: 'bbbb' }).then(r => {
        assert(r === null)
        User.findOne({ username: 'Joe' }).then(u => {
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
