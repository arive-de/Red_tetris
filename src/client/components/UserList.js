import React, { useEffect } from 'react'
import { GET_USERLIST, actAddUserList } from '../actions/getUsers'
import { useSelector, useDispatch } from 'react-redux'
import useDataApi from '../helpers/fetchData'
import './UserList.scss'

const UserList = () => {
  useDataApi('http://localhost:3004/api/user', [], GET_USERLIST)
  const socket = useSelector(state => state.socket)
  const userList = useSelector(state => state.userList)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('auth', data => {
        console.log('socket auth')
      if (data.error) {
        console.log(data.error)
        return
      }
      dispatch(actAddUserList(data.username))
    })
  }, [])
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
