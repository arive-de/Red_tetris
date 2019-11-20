const debug = require('debug')('∆:index spec')
const assert = require('assert')
const server = require('../index')
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
  describe('Socket auth', function() {
    let socket1, socket2
    const username1 = 'user1'
    const username2 = 'user2'
    beforeEach(function(done) {
      socket1 = ioClient.connect('http://localhost:3005', { forceNew: true });
      socket1.on('connect', () => {
        debug('on connect socket')
        socket1.emit('auth', username1)
        done()
      })
    })

    afterEach(function(done) {
      socket1 && socket1.connected && socket1.disconnect()
      socket2 && socket2.connected && socket2.disconnect()
      done()
    })

    it('client should disconnect', function(done) {
      socket2 = ioClient.connect('http://localhost:3005', { forceNew: true });
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

    it('username already exists in db', function(done) {
      socket2 = ioClient.connect('http://localhost:3005', { forceNew: true });
      socket2.on('connect', () => {
        socket2.emit('auth', username1)
        socket2.on('auth', (data) => {
          assert(data.error === 'user already exists')
          done()
        })
      })
    })

    it('client should type username', function(done) {
      socket1.on('auth', data => {
        assert(data.username === username1)
        done()
      })
    })

    it('client should get rooms and users updates', function(done) {
      socket2 = ioClient.connect('http://localhost:3005', { forceNew: true })
      socket2.on('connect', () => {
        socket2.emit('auth', username2)
        socket2.on('auth', (data) => {
          assert(data.username === username2)
          socket1.emit('update')
          socket1.on('update', data => {
            assert(data.users.indexOf(username1) !== -1)
            assert(data.users.indexOf(username2) !== -1)
            done()
          })
        })
      })
    })
  })

  describe('Socket room', function(done) {
    let socket1, socket2, socket3, socket4, socket5
    let roomId
    const user1 = 'user1'
    const user2 = 'user2'
    const user3 = 'user3'
    const user4 = 'user4'
    const user5 = 'user5'
    before(function(done) {
      socket1 = ioClient.connect('http://localhost:3005', { forceNew: true })
      socket1.on('connect', () => {
        socket1.emit('auth', user1)
        socket2 = ioClient.connect('http://localhost:3005', { forceNew: true })
        socket2.on('connect', () => {
          socket2.emit('auth', user2)
          socket3 = ioClient.connect('http://localhost:3005', { forceNew: true })
          socket3.on('connect', () => {
            socket3.emit('auth', user3)
            socket4 = ioClient.connect('http://localhost:3005', { forceNew: true })
            socket4.on('connect', () => {
              socket4.emit('auth', user4)
              socket5 = ioClient.connect('http://localhost:3005', { forceNew: true })
              socket5.on('connect', () => {
                socket5.emit('auth', user5)
                socket5.on('auth', () => {
                  done()
                  socket5.removeListener('auth')
                })
              })
            })
          })
        })
      })
    })

    it('there should be five users connected', function(done) {
      socket1.emit('update')
      socket1.on('update', data => {
        [user1, user2, user3, user4, user5].forEach(user => assert(data.users.indexOf(user) !== -1))
        done()
      })
    })

    it('user1 create a room', function(done) {
      socket1.emit('create_room', { username: 'user1', type: 'Classic'})
      socket1.on('created_room', data => {
        roomId = data.roomId
        assert(data.players[0] === user1)
        assert(data.type === 'Classic')
        assert(data.running === false)
        done()
      })
    })

    it('user2 joins the room', function(done) {
      socket2.emit('join_room', { roomId })
      socket2.on('joined_room', data => {
        assert(data.username === user2)
        socket2.emit('update')
        socket2.on('update', data => {
          const joinedRoom = data.rooms.find(r => r.roomId === roomId)
          assert(joinedRoom.players[1] === user2)
          done()
        })
      })
    })

    it('user1 leaves the room', function(done) {
      socket1.emit('leave_room', { roomId, username: user1 })
      socket1.on('left_room', data => {
        assert(data.username === user1)
        socket2.emit('update')
        socket2.on('update', data => {
          const joinedRoom = data.rooms.find(r => r.roomId === roomId)
          assert(joinedRoom.players[0] === user2)
          done()
        })
      })
    })

    it('user1 user3 user4 join the room', function(done) {
      socket1.emit('join_room', { roomId, username: user1 })
      socket1.on('joined_room', data => {
        socket3.emit('join_room', { roomId, username: user3 })
        socket3.on('joined_room', data => {
          socket4.emit('join_room', { roomId, username: user4 })
          socket4.on('joined_room', data => {
            socket2.emit('update')
            socket2.on('update', data => {
              const joinedRoom = data.rooms.find(r => r.roomId === roomId)
              assert(joinedRoom.players.length === 4)
              done()
            })
            socket4.removeListener('joined_room')
          })
          socket3.removeListener('joined_room')
        })
        socket1.removeListener('joined_room')
      })
    })

    it('user5 can\'t join a full room', function(done) {
      socket5.emit('join_room', { roomId, username: user5 })
      socket5.on('lobby', (data) => {
        socket5.emit('update')
        socket5.on('update', data => {
          const joinedRoom = data.rooms.find(r => r.roomId === roomId)
          assert(joinedRoom.players.length === 4)
          done()
        })
      })
    })

    it('user2 sends a message to the room', function(done) {
      socket2.emit('message', { message: 'hello' })
      socket3.on('message', data => {
        assert(data.username === user2)
        assert(data.message === 'hello')
        socket4.on('message', data => {
          assert(data.username === user2)
          assert(data.message === 'hello')
          done()
        })
      })
    })

    afterEach(function(done) {
      [socket1, socket2, socket3, socket4, socket5]
      .forEach(sock => sock && sock.connected && socket2.removeAllListeners())
      done()
    })
    after(function(done) {
      socket1 && socket1.connected && socket1.disconnect()
      socket2 && socket2.connected && socket2.disconnect()
      done()
    })
  })
})
