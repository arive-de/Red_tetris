import fs from 'fs'
import debug from 'debug'
import * as env from './env'
import { initSocketRoom } from './room'
const path = require('path');
const express = require('express')
const userRouter = require('./routes/user')

const logerror = debug('tetris:error'),
  loginfo = debug('tetris:info')

const initApp = (app, params, cb) => {
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

  app.on('request', handler)

  app.use('/api/user', userRouter)

  app.listen({ host, port }, () => {
    loginfo(`tetris listen on ${params.url}`)
    cb()
  })
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
    socket.on("disconnect", () => loginfo(`Socket disconnected: ${socket.id}`));
  })
}

export function create(params) {
  const promise = new Promise( (resolve, reject) => {
    const app = require('http').createServer(express())
    env.initDb();
    initApp(app, params, () => {
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
