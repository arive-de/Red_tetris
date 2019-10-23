import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetUsername, actLogout, actSetSocket } from '../actions/user'
import { actJoinRoom, actLeaveRoom, actCreateRoom } from '../actions/room'
import Home from '../components/Home'
import Lobby from '../components/Lobby'
import Game from '../components/Game'
import openSocket from 'socket.io-client'
import './app.scss'

const socket = openSocket('http://localhost:3004')

const App = () => {

  const dispatch = useDispatch()
  const storeSocket = useSelector(state => state.socket)
  const username = useSelector(state => state.username)
  const roomId = useSelector(state => state.roomId)
  const rooms = useSelector(state => state.rooms)

  if (!storeSocket) {

    dispatch(actSetSocket(socket))

    const url = document.createElement('a')

    url.href = window.location.href
  
    const res = url.hash.match(/#(.*)\[(.*)\]/)
  
    if (res && res[1] && res[2]) {
      const roomId = res[1]
      const username = res[2]
  
      socket.emit('url', { username, socketId: socket.socketId, roomId })
    }

    socket.on('auth', data => {
      if (data.error) {
        console.log(data.error)
        return
      }
      else {
        console.log('dispatch is ok')
        dispatch(actSetUsername(data.username))
      }
    })
    socket.on('created_room', data => {
      console.log('created new room', data)
      dispatch(actCreateRoom(data))
    });
    socket.on('logout', data => {
      dispatch(actLogout(data))
    })
    socket.on('left_room', data => {
      console.log('left room', data)
      dispatch(actLeaveRoom(data))
    });
    socket.on('joined_room', data => {
      console.log('joined new room', data)
      dispatch(actJoinRoom(data))
    })

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
