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
  const rooms = useSelector(state => state.rooms)

  if (username !== null && roomId !== null) {
    return (<Game room={rooms.find(r => r.roomId === roomId)} />)
  }
  if (username !== null) {
    return (<Lobby />)
  }
  return (<Home />)
}

export default (App)
  
