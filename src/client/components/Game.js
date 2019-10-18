import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actCreateRoom, actLeaveRoom } from '../actions/room'

export default function Game() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.username)
  const isPlaying = useSelector(state => state.isPlaying)
  const socket = useSelector(state => state.socket)
  const room = useSelector(state => state.rooms.find(r => r.roomId == state.roomId))
  if (room === undefined) {
    return (<div>'Room doesn\'t exist anymore'</div>)
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
    socket.on('left_room', data => {
      console.log('left room', data)
      dispatch(actLeaveRoom(data))
    });
    return () => {
      socket.removeListener('left_room')
    }
  }, [])
  return (
        // <div>
        //     <h2>Game </h2>
        //     <p>{isPlaying ? 'playing the game' : 'waiting for the game to start'}</p>
        //     {room.leader === username ?
        //     (<div><p>Im the leader</p><button onClick={onPlay}>Play</button></div>) :
        //     (<p>Im not the leader</p>)}
        // </div>
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
                <div className='row'>
                  <div className='col-sm-9'>
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
                                  <tr>
                                    <td scope='row'>{username} { room.players[0] === username ? <i className='fas fa-crown'></i> : '' }</td>
                                    <td><i className='far fa-check-square'></i></td>
                                  </tr>
                                    {/* {gameList.map((game, index) => (
                                        <GameList game={game} key={index} />
                                    ))} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    <div className='col-sm-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Chat</h5>
                            </div>
                        </div>
                    </div>
                </div>
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
    </div>
    )
}
