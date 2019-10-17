import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useDataApi from '../helpers/fetchData'
import './UserList.scss'

const UserList = () => {

  useDataApi('http://localhost:3004/api/user', [], 'GET_USERLIST')

  const userList = useSelector(state => state.userList)

  return <div className='card w-50'>

        <div className='card-header'>
            Connected players
        </div>
        <div className='card-body'>
            {userList.map((m, index) => (
                <div className='row' key={index}>
                    <span className='dot'></span>
                    <p className='card-text'>{m.username}</p>
                </div>
            ))}
        </div>
    </div>
}

export default (UserList)
