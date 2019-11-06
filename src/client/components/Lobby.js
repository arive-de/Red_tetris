import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actCreateRoom, actLeaveRoom } from '../actions/room'
import { actLogout } from '../actions/user'
import RoomList from './RoomList'
import UserList from './UserList'
import './Lobby.scss'

const Lobby = ({ error, setError }) => {

  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)
  const rooms = useSelector(state => state.rooms)
  const [type, setType] = useState('Classic')
  const [hideShow, setHideShow] = useState(false)

  console.log('hidehow = ', hideShow)

  const onCreate = () => {
    socket.emit('create_room', { username, type });
  }

  const onChange = (e) => {
    setType(e.target.value)
  }

  const onCheck = () => {
    setHideShow(!hideShow)
  }

  useEffect(() => {
    socket.emit('update', {})
  }, [])

  useEffect(() => {
    setError(error)

    return () => {
      setError(null)
    }
  }, [])
  return (
        <div>
            { error && (<div className='alert alert-danger' role='alert'>
             {error}
            </div>) }
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
                                        {rooms.filter(room => hideShow ? room.running === false && room.players.length !== 4 : true).map((room, index) =>
                                         (<RoomList key={index} room={room} />)
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Host a game</h5>
                                    <div className='input-group mb-3'>
                                        <div className='input-group-prepend'>
                                            <label className='input-group-text' htmlFor='inputGroupSelect01'>Type</label>
                                        </div>
                                        <select className='custom-select' onChange={onChange} value={type} >
                                            {/* <option defaultValue>Choose...</option> */}
                                            <option value='Classic'>Classic</option>
                                            <option value='Ghost'>Ghost </option>
                                        </select>
                                        </div>
                                    <button className='btn btn-primary' onClick={onCreate}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='form-check d-flex justify-content-left'>
                        <input className='form-check-input' id='hide' onClick={onCheck} type='checkbox' value='' />
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
