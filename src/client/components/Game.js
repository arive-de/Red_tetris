import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actCreateRoom, actLeaveRoom, actNewMessage } from '../actions/room'

export default function Game() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const username = useSelector(state => state.username)
  const isPlaying = useSelector(state => state.isPlaying)
  const socket = useSelector(state => state.socket)
  const room = useSelector(state => state.rooms.find(r => r.roomId === state.roomId))

  if (room === undefined) {
    return (<div>'Room doesn\'t exist anymore'</div>)
  }

  const onChange = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      console.log(message)
      setMessage('')
    }
  }

  const onPlay = () => {
    console.log('lets play');
    socket.on('play', data => dispatch(actCreateRoom(data)));
    socket.emit('play', room.roomId);
  }
  const onLeave = () => {
    console.log('onleave')
    socket.emit('leave_room', { username, roomId: room.roomId })
  }
  useEffect(() => {
    console.log('useEffect game')
    
    socket.on('message', data => dispatch(actNewMessage(data)))
    return () => {
    }
  }, [])
  return (
    <div>
      <div className='card text-center'>
          <div className='card-header'>
              <ul className='nav nav-tabs card-header-tabs'>
                  <li className='nav-item'>
                      <a className='nav-link active'>Room #{room.roomId}</a>
                  </li>
              </ul>
          </div>
          <div className='card-body' id='lobby'>
              {/* <div className='row'> */}
                <div className='col-sm-12'>
                  <div className='card'>
                      <div className='card-body'>
                          <table className='table table-striped'>
                              <thead>
                                  <tr>
                                      <th scope='col'>Players</th>
                                      <th scope='col'>Ready</th>
                                  </tr>
                              </thead>
                              <tbody>
                                { room.players.map((player, i) =>
                                  (
                                <tr key={i}>
                                  <td scope='row'>{player} { room.players[0] === player ?
                                  <i className='fas fa-crown'></i> : '' }</td>
                                  <td><i className='far fa-check-square'></i></td>
                                </tr>
                                  )
                                )}
                                  {/* {gameList.map((game, index) => (
                                      <GameList game={game} key={index} />
                                  ))} */}
                              </tbody>
                          </table>
                      </div>
                  </div>
                  </div>
              {/* </div> */}
              <div className='form-check d-flex'>
              <input className='form-check-input' id='hide' type='checkbox' value='' />
                <input className='form-check-input' id='ready' type='checkbox' value='' />
                <label className='form-check-label'>
                I am ready
                </label>
              </div>
          </div>
      </div>
      <button className='btn btn-danger' onClick={onLeave}>Leave</button>
      <div className='col-sm-12'>
        <div className='card'>
            <div className='card-body'>
                <h5 className='card-title'>Chat</h5>
            </div>
        </div>
        <div>
          <input className='form-control' onChange={onChange} onKeyDown={sendMessage} placeholder='Say something...' value={message}></input>
        </div>
      </div>
    </div>
    )
}
