import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Wall from './Wall'

import './Home.scss'

const Home = ({ error, setError }) => {
  
  const [username, setUsername] = useState('')
  const socket = useSelector(state => state.socket)

  const onChange = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      socket.emit('auth', username)
      socket.emit('highscore')
    }
  }

  useEffect(() => {
    setError(error)
    return () => {
      setError(null)
    }
  }, [error])

  return (
    <div className='d-flex row' id='home-box'>
      <Wall />
      <div className='card justify-content-center align-self-center mx-auto'>
        <div className='card-container card-body text-center'>
          <h5 className='card-title'>Red Tetris</h5>
            <div className='form-group d-flex flex-column align-items-center'>
              <input className='form-control' onChange={onChange}
                onKeyDown={handleKeyDown} placeholder='Type in a username' ></input>
            </div>
          </div>
          { error && (<div className='alert alert-danger' role='alert'>
              {error}
        </div>) }
      </div>
    </div>
    )
}

export default (Home)