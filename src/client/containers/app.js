import React from 'react'
import { useSelector } from 'react-redux'
import Home from '../components/Home'
import Lobby from '../components/Lobby'
import Game from '../components/Game'
import './app.scss'

const App = () => {
  const username = useSelector(state => state.username)
  const isPlaying = useSelector(state => state.isPlaying)
  const roomId = useSelector(state => state.roomId)
  const socket = useSelector(state => state.socket)
  const rooms = useSelector(state => state.rooms)

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

  if (username !== null && roomId !== null) {
    return (<Game room={rooms.find(r => r.roomId === roomId)} />)
  }
  if (username !== null) {
    return (<Lobby />)
  }
  return (<Home />)
}

export default (App)
  
