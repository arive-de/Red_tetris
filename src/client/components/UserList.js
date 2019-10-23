import React from 'react'
import { useSelector } from 'react-redux'
import './UserList.scss'

const UserList = () => {
  const userList = useSelector(state => state.userList)
  
  return <div className='card w-50'>

        <div className='card-header'>
            Connected players
        </div>
        <div className='card-body'>
            {userList.map((m, index) => (
                <div className='row' key={index}>
                    <span className='dot'></span>
                    <p className='card-text'>{m}</p>
                </div>
            ))}
        </div>
    </div>
}

export default (UserList)
