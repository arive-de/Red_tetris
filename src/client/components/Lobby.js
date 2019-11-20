import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actCreateRoom, actLeaveRoom } from '../actions/room'
import { actLogout, actSetTypeGame } from '../actions/user'
import RoomList from './RoomList'
import SearchPlayer from './SearchPlayer'
import './Lobby.scss'
import Navbar from 'react-bootstrap/navbar'
import Button from 'react-bootstrap/button'

const Lobby = ({ error, setError }) => {

  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)
  const rooms = useSelector(state => state.rooms)
  const [type, setType] = useState('Classic')
  const [chosen, setChosen] = useState(null)
  const [hideShow, setHideShow] = useState(false)
  const [sortField, setSortField] = useState('roomId')

  const onCreate = () => {
    socket.emit('create_room', { username, type });
  }

  const onChange = (e) => {
    setType(e.target.value)
  }

  const onCheck = () => {
    setHideShow(!hideShow)
      }

  const onReturn = () => {
    dispatch(actSetTypeGame(false))
  }

  const onJoin = (room) => {
    socket.emit('join_room', { roomId: room.roomId })
  }

  useEffect(() => {
    socket.emit('update', {})
  }, [])

  useEffect(() => {
    // setError(error)
    return () => {
      setError(null)
    }
  }, [])

  const sortRooms = (filter) => (a, b) => {
    if (filter === 'players') {
      return a.players.length - b.players.length
    }
    return a[filter] - b[filter]
  }

  return (
<<<<<<< HEAD
    <div>
        { error && (<div className='alert alert-danger' role='alert'>
          {error}
        </div>) }
        <Navbar>
          <Navbar.Brand><i className='fas fa-arrow-alt-circle-left fa-2x' onClick={onReturn} /></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-center'>
            <Navbar.Text>
              <h2>Lobby</h2>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <br/>
        <div className=''>
            <div className='card'>
                <div className='card-body table'>
                    <div className='table-row'>
                        <div className='table-cell'>
                          <span>Room</span>
                          <i className='sort fas fa-sort d-flex justify-content-end' onClick={() => { setSortField('roomId') }} />
                        </div>
                        <div className='table-cell'>
                          <span>Game</span>
                          <i className='sort fas fa-sort d-flex justify-content-end' onClick={() => { setSortField('type') }} />
                        </div>
                        <div className='table-cell'>
                          <span>Players</span>
                          <i className='sort fas fa-sort d-flex justify-content-end' onClick={() => { setSortField('players') }} />
                        </div>
                        <div className='table-cell'>
                          <span>Status</span>
                          <i className='sort fas fa-sort d-flex justify-content-end' onClick={() => { setSortField('status') }} />
                        </div>
                    </div>
                    {rooms.filter(room => hideShow ? room.running === false && room.players.length !== 4 : true).sort(sortRooms(sortField)).map((room, index) =>
                        (<RoomList active={room === chosen} key={index} onClick={() => setChosen(room)} room={room}/>)
                    )}
                </div>
                <div className='text-center'>
                  <Button className='button' disabled={chosen === null} onClick={() => onJoin(chosen)} variant='primary' >Join</Button>
                </div>
            </div>
            <div className='form-check'>
              <input className='form-check-input' id='hide' onClick={onCheck} type='checkbox' value='' />
              <i className="fas fa-filter"></i>
            </div>
            <div className='card-body' id='lobby'>
                <div className='row'>
                    <div className='col'>
                      <UserList />
                    </div>
                    <div className='col'>
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
                                <Button onClick={onCreate} variant='primary'>Create</Button>
                            </div>
                        </div>
                    </div>
                </div>
=======
		<div>
				{ error && (<div className='alert alert-danger' role='alert'>
					{error}
				</div>) }
				<Navbar>
					<Navbar.Brand><i className='fas fa-arrow-alt-circle-left fa-2x' onClick={onReturn} /></Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-center'>
						<Navbar.Text>
							<h2>Lobby</h2>
						</Navbar.Text>
					</Navbar.Collapse>
				</Navbar>
				<br/>
				<div className=''>
						<div className='card'>
								<div className='card-body table'>
										<div className='table-row'>
												<div className='table-cell'>
													<span>Room</span>
													<i className='sort fas fa-sort d-flex justify-content-end'></i>
												</div>
												<div className='table-cell'>
													<span>Game</span>
													<i className='sort fas fa-sort d-flex justify-content-end'></i>
												</div>
												<div className='table-cell'>
													<span>Players</span>
													<i className='sort fas fa-sort d-flex justify-content-end'></i>
												</div>
												<div className='table-cell'>
													<span>Status</span>
													<i className='sort fas fa-sort d-flex justify-content-end'></i>
												</div>
										</div>
										{rooms.filter(room => hideShow ? room.running === false && room.players.length !== 4 : true).map((room, index) =>
												(<RoomList active={room === chosen} key={index} onClick={() => setChosen(room)} room={room}/>)
										)}
								</div>
								<div className='text-center'>
									<Button className='button' disabled={chosen === null || chosen.players.length === 4} onClick={() => onJoin(chosen)} variant='primary' >Join</Button>
								</div>
						</div>
						<div className='form-check'>
							<input className='form-check-input' id='hide' onClick={onCheck} type='checkbox' value='' />
							<label className='form-check-label'>
							Hide running and full tables
							</label>
						</div>
						<div className='card-body' id='lobby'>
								<div className='row'>
										<div className='col'>
											<SearchPlayer />
										</div>
										<div className='col'>
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
																<Button onClick={onCreate} variant='primary'>Create</Button>
														</div>
												</div>
										</div>
								</div>
>>>>>>> 5eac8526e04b91d8ebafeaa549bb1d1fc056917b

            </div>
        </div>
    </div>
    )
}

export default (Lobby)
