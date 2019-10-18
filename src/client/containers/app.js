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

  if (username !== null && roomId !== null) {
    return (<Game />);
  }
  if (username !== null) {
    return (<Lobby />);
  }
  return (<Home />);
}

export default (App)
  
