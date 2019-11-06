const { create } = require('./index')
const ioClient = require('socket.io-client')

describe('Server', function() {

  before(create)

  // after(function(done) {
  //   io.close()
  // })

  describe('Socket', function() {

    let socket1;

    beforeEach(function(done) {
      socket1 = ioClient.connect('http://localhost:3004', { forceNew: true, query: '' });
      socket1.on('connect', () => {
        done();
      });
    });

    afterEach(function(done) {
      socket1 && socket1.connected && socket1.disconnect();
      done();
    });

    it('client should connect', function(done) {
      io.on('connection', function(socket) {
        console.log(`Socket connected: ${socket.id}`)
        assert.notEqual(socket, null, 'socket should not be null');
        done()
      })
      done()
    })
  })
})
