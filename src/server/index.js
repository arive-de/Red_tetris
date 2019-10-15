const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const userRouter = require('./routes/user')
const cors = require('cors')

import fs from 'fs'
import debug from 'debug'
import * as env from './env'
import { initSocketRoom } from './room'

const logerror = debug('tetris:error'),
loginfo = debug('tetris:info')

const initApp = (app, expr, params, cb) => {
  const { host, port } = params
  const handler = (req, res) => {
    const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html'
    fs.readFile(path.join(__dirname, file), (err, data) => {
      if (err) {
        logerror(err)
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  }
  app.listen({ host, port }, () => {
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
  expr.use(cors())
  expr.use(bodyParser.urlencoded({ extended: false }))
  expr.use(express.json())
  expr.use('/api/user', userRouter)
  expr.use('/', handler)
}

const initEngine = io => {
  io.on('connection', (socket) => {
    loginfo(`Socket connected: ${socket.id}`)

    socket.on('action', (action) => {
      if (action.type === 'server/ping') {
        socket.emit('action', { type: 'pong' })
      }
    })
    initSocketRoom(io, socket)
    socket.on('disconnect', () => loginfo(`Socket disconnected: ${socket.id}`));
  })
}

export function create(params) {
  const promise = new Promise( (resolve, reject) => {
    const expr = express()
    const app = require('http').Server(expr)
    env.initDb();
    initApp(app, expr, params, () => {
      const io = require('socket.io')(app)
      const stop = (cb) => {
        io.close()
        app.close(() => {
          app.unref()
        })
        loginfo('Engine stopped.')
        cb()
      }
      initEngine(io)
      resolve({ stop })
    })
  })
  return promise
}
