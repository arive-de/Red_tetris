import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Game from './Game'

const Room = ({ room }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const username = useSelector(state => state.username)
  const isPlaying = useSelector(state => state.isPlaying)
  const socket = useSelector(state => state.socket)

  const onChange = (e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      socket.emit('message', { roomId: room.roomdId, username, message })
      setMessage('')
    }
  }

  const onPlay = () => {
    socket.emit('play_game', { roomId: room.roomId });
  }

  const onLeave = () => {
    socket.emit('leave_room', { username, roomId: room.roomId })
  }

  useEffect(() => {

    console.log(room)

    socket.on('message', data => {
      setMessages(ms => [...ms, data])
    })
    return () => {
      socket.removeListener('message')
    }
  }, [])

  if (isPlaying) {
    return <Game room={room} />
  }

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
      { username === room.players[0] ? <button id='playButton' className='btn btn-primary' onClick={onPlay}>Play</button> : null }
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

export default Room

