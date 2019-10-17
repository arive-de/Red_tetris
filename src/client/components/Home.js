import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetUsername } from '../actions/user'
import openSocket from 'socket.io-client'
const axios = require('axios')

const Home = () => {
  // const storeUsername = useSelector(state => state.username);
  const [username, setUserName] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const onChange = (e) => {
    e.preventDefault()
    setUserName(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {

      const socket = openSocket('http://localhost:3004')

      socket.emit('auth', username)

      socket.on('auth', data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          dispatch(actSetUsername({ data, socket }))
        }
      });
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