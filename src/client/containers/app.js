import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetUsername, actAddUser, actLogout, actSetSocket, actGetUsers } from '../actions/user'
import { actJoinRoom, actLeaveRoom, actCreateRoom, actGetRooms } from '../actions/room'
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
  const [error, setError] = useState('')

  console.log('APP', rooms)
  if (!storeSocket) {

    dispatch(actSetSocket(socket))

    const url = document.createElement('a')

    url.href = window.location.href
    console.log(url.hash)
    const res = url.hash.match(/^#(.*)\[(.*)\]$/)
  
    if (res && res[1] && res[2]) {
      const roomId = res[1]
      const username = res[2]
  
      socket.emit('url', { username, socketId: socket.socketId, roomId })
    }

    socket.on('auth', data => {
      if (data.error) {
        setError(data.error)
        return
      }
      console.log('dispatch is ok')
      dispatch(actSetUsername(data.username))
      dispatch(actAddUser(data.username))
    })
    socket.on('lobby', data => {
      if (data.error) {
        setError(data.error)
        return
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
    socket.on('update', ({ users, rooms }) => {
      dispatch(actGetRooms(rooms))
      dispatch(actGetUsers(users))
    })
  }

  if (username !== null && roomId !== null) {
    console.log(roomId, rooms, rooms.find(r => r.roomId === roomId))
    if (rooms.find(r => r.roomId === roomId)) {
      return (<Game room={rooms.find(r => r.roomId === roomId)} />)
    }
    else {
      return (<div>Loading</div>)
    }
  }
  if (username !== null) {
    return (<Lobby error={error}/>)
  }
  return (<Home error={error}/>)
}

export default (App)
