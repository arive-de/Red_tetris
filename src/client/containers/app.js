import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetUsername, actAddUser, actLogout, actSetSocket, actGetUsers, actSetTypeGame } from '../actions/user'
import { actJoinRoom, actLeaveRoom, actCreateRoom, actGetRooms, actPlayGame } from '../actions/room'
import Home from '../components/Home'
import Menu from '../components/Menu'
import Lobby from '../components/Lobby'
import Room from '../components/Room'
import openSocket from 'socket.io-client'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss'

const socket = openSocket('http://localhost:3004')

const App = () => {

  const dispatch = useDispatch()
  const storeSocket = useSelector(state => state.socket)
  const username = useSelector(state => state.username)
  const roomId = useSelector(state => state.roomId)
  const rooms = useSelector(state => state.rooms)
  const typeGame = useSelector(state => state.typeGame)
  const [error, setError] = useState('')
  const [errorLobby, setErrorLobby] = useState('')

  useEffect(() => {
    return () => {
      console.log('unmount app')
    }
  }, [])

  if (!storeSocket) {

    dispatch(actSetSocket(socket))

    const url = document.createElement('a')

    url.href = window.location.href
    const res = url.hash.match(/^#(.*)\[(.*)\]$/)
  
    if (res && res[1] && res[2]) {
      const roomId = res[1]
      const username = res[2]
      dispatch(actSetTypeGame(true))
      socket.emit('url', { username, socketId: socket.socketId, roomId })
    }

    socket.on('auth', data => {
      if (data.error) {
        setError(data.error)
        return
      }
      dispatch(actSetUsername(data.username))
      dispatch(actAddUser(data.username))
    })
    socket.on('lobby', data => {
      if (data.error) {
        setErrorLobby(data.error)
        return
      }
    })
    socket.on('created_room', data => {
      dispatch(actCreateRoom(data))
    })
    socket.on('logout', data => {
      dispatch(actLogout(data))
    })
    socket.on('left_room', data => {
      dispatch(actLeaveRoom(data))
    })
    socket.on('joined_room', data => {
      dispatch(actJoinRoom(data))
    })
    socket.on('update', ({ users, rooms }) => {
      dispatch(actGetRooms(rooms))
      dispatch(actGetUsers(users))
    })
    socket.on('play_game', data => {
      dispatch(actPlayGame(data))
    })
  }

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
  return (<Home error={error} setError={setError}/>)
}

export default (App)
