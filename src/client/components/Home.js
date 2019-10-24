import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './Lobby.scss'

const Home = ({ error, setError }) => {
  
  const [username, setUsername] = useState('')
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

  useEffect(() => {
    setError(error)
    
    return () => {
      setError(null)
    }
  }, [error])

  return (
      <div className='card text-center'>
        <div className='card-body'>
          <h5 className='card-title'>Red tetris</h5>
          <div className='form-group d-flex flex-column align-items-center'>
            <input className='form-control' onChange={onChange}
              onKeyDown={handleKeyDown} placeholder='Type in a username' ></input>
          </div>
        </div>
        { error && (<div className='alert alert-danger' role='alert'>
            {error}
        </div>) }
      </div>

    )
}

export default (Home)
