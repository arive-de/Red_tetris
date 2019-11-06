// const express = require('express')
// const app = express()
// const http = require('http').Server(app)
// const io = require('socket.io')(http)
// const assert = require('assert')

// import { launchApp } from '../server/index'

// const ioClient = require('socket.io-client')

// launchApp()

// io.on('connection', (socket) => {
//   socket.on('event', () => {
//     socket.emit('hello', 'world');
//   });
// });

// http.listen(params.server.port, () => {
//   console.log(`server is running on port ${params.server.port}`)
// })

// describe('Server', function() {

//   before(launchAp

  // after(function(done) {
  //   io.close()
  // })

  // describe('Socket', function() {

  //   let socket1;

  //   beforeEach(function(done) {
  //     socket1 = ioClient.connect('http://localhost:3004', { forceNew: true, query: '' });
  //     socket1.on('connect', () => {
  //       done();
  //     });
  //   });

  //   afterEach(function(done) {
  //     socket1 && socket1.connected && socket1.disconnect();
  //     done();
  //   });

  //   it('client should connect', function(done) {
  //     io.on('connection', function(socket) {
  //       console.log(`Socket connected: ${socket.id}`)
  //       assert.notEqual(socket, null, 'socket should not be null');
  //       done()
  //     })
  //     done()
  //   })
  // })
// })
