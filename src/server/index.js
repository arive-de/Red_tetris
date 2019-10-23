const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const userRouter = require('./routes/user')
const roomRouter = require('./routes/room')
const cors = require('cors')

import params from '../../params'
import fs from 'fs'
import * as env from './env'
import { initSocketAuth } from './sockets/auth'
import { initSocketRoom } from './sockets/room'
import { initSocketUrl } from './sockets/url'
import { deleteUser } from './controllers/user'

const connect = () => {
  const options = { useNewUrlParser: true, useUnifiedTopology: true }
  mongoose.connect(params.db.url, options)
  return mongoose.connection
}

const handler = (req, res) => {
  const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
  fs.readFile(path.join(__dirname, file), (err, data) => {
    if (err) {
      console.log(err)
      res.writeHead(500)
      return res.end('Error loading index.html')
    }
    res.writeHead(200)
    res.end(data)
  })
}

const initEngine = io => {
  console.log('initengine')
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    initSocketAuth(io, socket)
    initSocketRoom(io, socket)
    initSocketUrl(io, socket)
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`)
      deleteUser(socket.username, socket.roomId, (error) => {
        if (socket.roomId) {
          io.to(socket.roomId).emit('logout', { error, username: socket.username, roomId: socket.roomId })
        }
        io.to('lobby').emit('logout', { error, username: socket.username, roomId: socket.roomId })
      })
    });
  })
}
const main = () => {
  env.initDb()
  initEngine(io)
  http.listen(params.server.port, () => {
    console.log(`server is running on port ${params.server.port}`)
  })
}

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/room', roomRouter)
app.use('*', handler)

connect()
.on('disconnected', connect)
.on('open', main)
.on('error', console.log)
