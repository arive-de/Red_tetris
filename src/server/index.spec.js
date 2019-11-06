const debug = require('debug')('∆:index spec')
const assert = require('assert')
const server = require('../server/index')
const ioClient = require('socket.io-client')

describe('Server', function() {
  let stopServer
  before(function(done) {
    server.create(3005).then(({ stop }) => {
      stopServer = stop
      done()
    })
  })

  after(function(done) {
    stopServer(() => {
      debug('stopServer test')
      done()
    })
  })

  describe('Socket', function() {

    let socket1
    let username1 = 'user1'
    let username2 = 'user2'

    beforeEach(function(done) {
      socket1 = ioClient.connect('http://localhost:3005', { forceNew: true });
      socket1.on('connect', () => {
        debug('on connect socket')
        socket1.emit('auth', username1)
        done()
      });
    });

    afterEach(function(done) {
      socket1 && socket1.connected && socket1.disconnect()
      done()
    });

    it('client should disconnect', function(done) {
      const socket2 = ioClient.connect('http://localhost:3005', { forceNew: true });
      socket2.on('connect', () => {
        socket2.emit('auth', username2)
        socket2.on('auth', (data) => {
          assert(data.username === username2)
          socket2.disconnect()
          socket1.on('logout', (data) => {
            assert(data.username === username2)
            done()
          })
        })
      })
    })

    it('client should type username', function(done) {
      socket1.on('auth', data => {
        assert(data.username === username1)
        done()
      })
    })
  })
})
