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
const Room = require('./models/Room')

import params from '../../params'
import fs from 'fs'
import * as env from './env'
import { initSocketRoom } from './room'
import { deleteUser, createUser } from './controllers/user'

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

    socket.on('auth', username => {
      createUser(username, socket.id, error => io.sockets.emit('auth', { error, username }))
      socket.username = username
      socket.roomId = null
    })
    initSocketRoom(io, socket)
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`)
      deleteUser(socket.username, socket.roomId, (error) => {
        Room.find({}).then(rooms => {
          io.sockets.emit('logout', { error, rooms })
        })
        .catch(err => {
          console.log(err)
          io.sockets.emit('logout', { error: 'can not access db to get the rooms' })
        })
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
app.use('/', handler)

connect()
.on('disconnected', connect)
.on('open', main)
.on('error', console.log)
