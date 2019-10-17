import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Game() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.username)
  const isPlaying = useSelector(state => state.isPlaying)
  const room = useSelector(state => state.rooms.find(r => r.roomId == state.roomId))
  if (room === undefined) {
      return (<div>'Room doesn\'t exist anymore'</div>)
    }
  const onPlay = () => {
      console.log('lets play');
      socket.on('play', data => dispatch(actCreateRoom(data)));
      socket.emit('play', room.roomId);
    }
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
                        <a className='nav-link active'>Room #</a>
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
                                    <td scope='row'>{username} { room.leader === username ? <i className='fas fa-crown'></i> : '' }</td>
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
    </div>
    )
}
