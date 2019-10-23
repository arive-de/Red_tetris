import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetUsername, actLogout } from '../actions/user'
import { actJoinRoom, actLeaveRoom, actCreateRoom } from '../actions/room'
import './Lobby.scss'

const Home = () => {
  // const storeUsername = useSelector(state => state.username);
  const [username, setUsername] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const socket = useSelector(state => state.socket)

  const onChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {

      // Faire les checks sur l'input
      console.log(socket)
      socket.emit('auth', username)
      socket.on('auth', data => {
        if (data.error) {
          console.log(data.error)
          return
        }
        else {
          console.log('dispatch is ok')
          console.log(data)
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
  }
  console.log(username);
  return (
      <div className='card text-center'>
        <div className='card-body'>
          <h5 className='card-title'>Red tetris</h5>
          <div className='form-group d-flex flex-column align-items-center'>
            <input className='form-control' onChange={onChange} onKeyDown={handleKeyDown} placeholder='Type in a username' ></input>
          </div>
        </div>
      </div>
    )
}

export default (Home)
