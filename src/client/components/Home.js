import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import './Lobby.scss'

const Home = () => {
  // const storeUsername = useSelector(state => state.username);
  const [username, setUsername] = useState('')
  const [error, setError] = useState(false)
  const socket = useSelector(state => state.socket)

  const onChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Faire les checks sur l'input
      socket.emit('auth', username)
    }
  }
  return (
      <div className='card text-center'>
        <div className='card-body'>
          <h5 className='card-title'>Red tetris</h5>
          <div className='form-group d-flex flex-column align-items-center'>
            <input className='form-control' onChange={onChange}
              onKeyDown={handleKeyDown} placeholder='Type in a username' ></input>
          </div>
        </div>
      </div>
    )
}

export default (Home)
