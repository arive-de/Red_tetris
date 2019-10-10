import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetGameList } from '../actions/gameList'
import GameList from './GameList'

const Lobby = () => {

  const dispatch = useDispatch();
  const username = useSelector(state => state.username)
  const gameList = useSelector(state => state.gameList)
  const socket = useSelector(state => state.socket)

  const onCreate = () => {
    socket.emit('create', username);
  }
  useEffect(() => {
    socket.on('create', data => {
      console.log(`${username} socket client create`)
      dispatch(actSetGameList(data))
    });
}
    , [])

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
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Room</th>
                                                <th scope='col'>Game</th>
                                                <th scope='col'>Players</th>
                                                <th scope='col'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gameList.map((game, index) => (
                                                <GameList key={index} game={game} />
                                            ))}
                                        </tbody>
                                    </table>
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
                        <input className='form-check-input' type='checkbox' value='' id='defaultCheck1' />
                        <label className='form-check-label'>
                        Hide running and full tables
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default (Lobby)
