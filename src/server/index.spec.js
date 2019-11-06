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
      console.log('stopServer test')
      done()
    })
  })

  describe('Socket', function() {

    let socket1;

    beforeEach(function(done) {
      socket1 = ioClient.connect('http://localhost:3004', { forceNew: true, query: '' });
      socket1.on('connect', () => {
        console.log('on connect socket')
        done();
      });
    });

    afterEach(function(done) {
      socket1 && socket1.connected && socket1.disconnect();
      done();
    });

    it('client should connect', function(done) {

      done()
    })
  })
})
