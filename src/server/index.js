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
import { initSocketRoom } from './room'
import { deleteUser, createUser } from './controllers/user'
import { createRoom } from './controllers/room'
import { createBrotliCompress } from 'zlib'

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
      createUser(username, socket.id, error => {
        if (error) {
          socket.emit('auth', { error })
        }
        else {
          console.log('USERNAME: ', username)
          io.sockets.emit('auth', { username })
        }
      })
    })

    socket.on('create_room', username => {
      createRoom(username, error => {
        if (error) {
          socket.emit('lobby', { error })
        }
        else {
          io.sockets.emit('lobby', { players: [username], type: 'Classic', roomId: 'xx06', running: false })

          // ici renvoyer le nom de la room + username
        }
      })
    })

    initSocketRoom(io, socket)
    socket.on('disconnect', () => console.log(`Socket disconnected: ${socket.id}`));
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
  .on('error', console.log)
  .on('disconnected', connect)
  .on('open', main)
