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
    if (e.key === 'Enter' && username.length) {
      socket.emit('auth', username)
      socket.emit('highscore')
    }
  }

  useEffect(() => {
    setError(error)
    const timeout = setTimeout(() => {
      setError(null)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [error])

  return (
    <div className='d-flex row' id='home-box'>
     { error &&
      (<div className='error alert alert-danger' >{error}</div>) }
      <Wall />
      <div className='card justify-content-center align-self-center mx-auto'>
        <div className='card-container card-body text-center'>
          <h5 className='card-title'>TetrisForJeff</h5>
            <div className='form-group d-flex flex-column align-items-center'>
              <input autoFocus className='form-control' maxLength='12' onChange={onChange}
                onKeyDown={handleKeyDown} placeholder='username'></input>
            </div>
          </div>
         
      </div>
    </div>
    )
}

export default (Home)