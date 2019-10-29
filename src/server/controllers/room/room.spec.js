const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assert = require('assert')
const Room = require('../../models/Room')
const { connect, disconnect  } = require('../../helpers.spec')

connect()

describe('Creating room()', function() {
  it('creates a room', function(done) {

    const room = new Room({
      players: ['Dent'],
      roomId: 'xx05',
      type: 'Classic',
      running: false,
    })
    
    room.save()
        .then(() => {
          assert(!room.isNew)
          done()
        })
  })
})

disconnect()
