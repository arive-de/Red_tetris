import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actCreateRoom, actLeaveRoom } from '../actions/room'
import { actLogout } from '../actions/user'
import RoomList from './RoomList'
import UserList from './UserList'
import './Lobby.scss'

const Lobby = () => {

  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)
  const rooms = useSelector(state => state.rooms)
  console.log('LOBBY', rooms)
  const onCreate = () => {
    socket.emit('create_room', username);
  }
  useEffect(() => {
    socket.emit('update', {})
  }, [])
  return (
        <div>
            <div className='card text-center'>
                <div className='card-header'>
                    <ul className='nav nav-tabs card-header-tabs'>
                        <li className='nav-item'>
                            <a className='nav-link active'>Lobby</a>
                        </li>
                    </ul>
                </div>
                <div className='card-body' id='lobby'>
                    <div className='row'>
                        <div className='col-sm-9'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='row d-flex justify-content-around'>
                                        <div>Room</div>
                                        <div>Game</div>
                                        <div>Players</div>
                                        <div>Status</div>
                                    </div>
                                    <div className='col'>
                                        {rooms.map((room, index) => (
                                            <RoomList key={index} room={room} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Host a game</h5>
                                    <button className='btn btn-primary' onClick={onCreate}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='form-check d-flex justify-content-left'>
                        <input className='form-check-input' id='hide' type='checkbox' value='' />
                        <label className='form-check-label'>
                        Hide running and full tables
                        </label>
                    </div>
                </div>
            </div>
            <br />
            <UserList />
        </div>
    )
}

export default (Lobby)
