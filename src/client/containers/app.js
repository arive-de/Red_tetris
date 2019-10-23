import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetSocket } from '../actions/user'
import Home from '../components/Home'
import Lobby from '../components/Lobby'
import Game from '../components/Game'
import openSocket from 'socket.io-client'
import './app.scss'

const socket = openSocket('http://localhost:3004')

const App = () => {

  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const isPlaying = useSelector(state => state.isPlaying)
  const roomId = useSelector(state => state.roomId)
  const rooms = useSelector(state => state.rooms)

  if (socket) {
    dispatch(actSetSocket(socket))

    const url = document.createElement('a')

    url.href = window.location.href
  
    const res = url.hash.match(/#(.*)\[(.*)\]/)
  
    if (res && res[1] && res[2]) {
      const roomId = res[1]
      const username = res[2]
  
      console.log('roomId:', roomId)
      console.log('username:', username)
  
      socket.emit('url', { username, roomId })
    }
  }

  if (username !== null && roomId !== null) {
    return (<Game room={rooms.find(r => r.roomId === roomId)} />)
  }
  if (username !== null) {
    return (<Lobby />)
  }
  return (<Home />)
}

export default (App)
