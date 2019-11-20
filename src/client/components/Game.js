import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Game = ({ room }) => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)

  const onStop = () => {
    socket.emit('stop', room.roomId);
  }

  useEffect(() => {
    console.log('Game component useEffect')
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
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row d-flex justify-content-around'>
                                <div>Players</div>
                            </div>
                            <div className='col'>
                              { room.players.map((player, i) =>
                                (<div key={i}>
                                    <p scope='row'>{player} { room.players[0] === player ? <i className='fas fa-crown'></i> : '' }</p>
                                  </div>)
                              )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <button className='btn btn-danger' onClick={onLeave}>Leave</button>
      <div className='col-sm-12'>
        <div className='card'>
            <div className='card-body'>
                <h5 className='card-title'>Chat</h5>
               { messages.map((m, index) => (<div key={index}>{m.username}: {m.message}</div>))}
            </div>
        </div>
        <div>
          <input className='form-control' onChange={onChange} onKeyDown={sendMessage} placeholder='Say something...' value={message}></input>
        </div>
      </div>
    </div>
    )
}

export default Game

