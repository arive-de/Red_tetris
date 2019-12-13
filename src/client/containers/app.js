import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetTypeGame, actConnectSocket } from '../actions/user'
import Home from '../components/Home'
import Menu from '../components/Menu'
import Lobby from '../components/Lobby'
import Room from '../components/Room'
import './app.scss'

const App = () => {

  const dispatch = useDispatch()
  const storeSocket = useSelector(state => state.socket)
  const username = useSelector(state => state.username)
  const roomId = useSelector(state => state.roomId)
  const rooms = useSelector(state => state.rooms)
  const typeGame = useSelector(state => state.typeGame)
  const [errorHome, setErrorHome] = useState('')
  const [errorLobby, setErrorLobby] = useState('')

  useEffect(() => {
    if (storeSocket) {
      return
    }
    dispatch(actConnectSocket(setErrorHome, setErrorLobby))
    return () => {
      console.log('unmount app')
    } }, [])

  useEffect(() => {
    if (!storeSocket) {
      return
    }
    const url = document.createElement('a')
    url.href = window.location.href
    const res = url.hash.match(/^#(.*)\[(.*)\]$/)
  
    if (res && res[1] && res[2]) {
      const roomId = res[1].substr(0, 10)
      const username = res[2].substr(0, 10)
      dispatch(actSetTypeGame(true))
      storeSocket.emit('url', { username, socketId: storeSocket.socketId, roomId })
    }
  }, [storeSocket])

  if (username !== null && roomId !== null) {
    if (rooms.find(r => r.roomId === roomId)) {
      return (<Room room={rooms.find(r => r.roomId === roomId)} />)
    }
    else {
      return (<div>Loading</div>)
    }
  }
  if (username !== null && typeGame === false) {
    return (<Menu />)
  }
  if (username !== null && typeGame === true) {
    return (<Lobby error={errorLobby} setError={setErrorLobby} />)
  }
  return (<Home error={errorHome} setError={setErrorHome}/>)
}

export default (App)
