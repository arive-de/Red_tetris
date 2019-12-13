import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetTypeGame } from '../actions/user'
import RoomList from './RoomList'
import Wall from './Wall'
import SearchPlayer from './SearchPlayer'
import Header from './Header'
import './Lobby.scss'
import Button from 'react-bootstrap/Button'

const Lobby = ({ error, setError }) => {

  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)
  const rooms = useSelector(state => state.rooms)
  const [type, setType] = useState('Classic')
  const [chosen, setChosen] = useState(null)
  const [hideShow, setHideShow] = useState(false)
  const [sortField, setSortField] = useState('roomId')
  
  const title = 'Lobby'
  const onCreate = () => {
    socket.emit('create_room', { username, type });
  }

  const onChange = (e) => {
    setType(e.target.value)
  }

  const onCheck = () => {
    setHideShow(!hideShow)
  }

  const onJoin = (room) => {
    socket.emit('join_room', { roomId: room.roomId })
  }

  useEffect(() => {
    socket.emit('update', {})
  }, [])

  const sortRooms = (filter) => (a, b) => {
    if (filter === 'players') {
      return a.players.length - b.players.length
    }
    if (filter === 'running') {
      return a.running - b.running
    }
    if (filter === 'type') {
      return a.type.localeCompare(b.type)
    }
    if (filter === 'roomId') {
      return a.roomId.localeCompare(b.roomId)
    }
  }

  useEffect(() => {
    return () => {
      setError(null)
    }
  }, [])

  const onReturn = () => {
    dispatch(actSetTypeGame(false))
  }

  return (
    <div>
      <Wall/>
        <Header error={error} setError={setError} title={title} onReturn={onReturn}></Header>
        <div id='lobbyContainer' className=''>
            <div className='card'>
                <div className='card-body'>
                <div className='table-container' role='table'>
                  <div className='flex-table header' role='rowgroup'>
                    <div className='flex-row first' role='columnheader'>
                      Room
                      <i className='sort fas fa-sort d-flex justify-content-end' onClick={() => { setSortField('roomId') }} />
                    </div>
                    <div className='flex-row' role='columnheader'>
                      Game
                      <i className='sort fas fa-sort d-flex justify-content-end' onClick={() => { setSortField('type') }} />
                    </div>
                    <div className='flex-row' role='columnheader'>
                      Players
                      <i className='sort fas fa-sort d-flex justify-content-end' onClick={() => { setSortField('players') }} />
                    </div>
                    <div className='flex-row' role='columnheader'>
                      Status
                      <i className='sort fas fa-sort d-flex justify-content-end' onClick={() => { setSortField('running') }} />
                    </div>
                  </div>
                  {rooms.sort(sortRooms(sortField)).filter(room => hideShow ? room.running === false && room.players.length !== 4 : true).map((room, index) =>
                  (<RoomList active={room === chosen} key={index} onClick={() => setChosen(room)} room={room}/>)
                  )}
                </div>
                </div>
                <div className='text-center'>
                  <Button id='joinRoomButton' className='button' disabled={chosen === null} onClick={() => onJoin(chosen)} variant='primary' >Join</Button>
                </div>
            </div>
            <div className='form-check'>
              <input autoComplete='off' className='form-check-input' id='hide' onClick={onCheck} type='checkbox' value='' />
              <i className='fas fa-filter'></i>
            </div>
            <div className='card-body' id='lobby'>
                <div className='row'>
                    <div className='col'>
                      <SearchPlayer rooms={rooms} onJoin={onJoin}/>
                    </div>
                    <div className='col'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Host a game</h5>
                                <div className='input-group mb-3'>
                                    <div className='input-group-prepend'>
                                        <label className='input-group-text'>Type</label>
                                    </div>
                                    <select className='custom-select' onChange={onChange} value={type}>
                                        <option value='Classic'>Classic</option>
                                        <option value='Ghost'>Ghost </option>
                                    </select>
                                </div>
                                <Button onClick={onCreate} variant='primary'>Create</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default (Lobby)
