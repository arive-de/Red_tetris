import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Game from './Game'
import Header from './Header'
import ListGroup from 'react-bootstrap/ListGroup'
import './Room.scss'

const Room = ({ room }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const username = useSelector(state => state.username)
  const isPlaying = useSelector(state => state.isPlaying)
  const socket = useSelector(state => state.socket)

  const title = 'Room' + room.roomId

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
      <Header title={title}></Header>
      <button id='leaveRoomButton' className='btn btn-danger' onClick={onLeave}>Leave</button>
      {/* {player} { room.players[0] === player ? <i className='fas fa-crown'></i> : '' } */}              
      <ListGroup className='list-group'>
      { room.players.map((player, i) =>
        (<div key={i}>
            {i === 0 && <ListGroup.Item variant='success'>
              <div className='row'>
                <div className='player'>{player}</div>
                <div className='victories'>5 victories</div>
              </div>
            </ListGroup.Item>}
            {i !== 0 && i !== room.players.length - 1 && <ListGroup.Item>
              <div className='row'>
                <div className='player'>{player}</div>
                <div className='victories'>5 victories</div>
              </div>
            </ListGroup.Item>}
            {i === room.players.length - 1 && <ListGroup.Item variant='danger'>
            <div className='row'>
                <div className='player'>{player}</div>
                <div className='victories'>5 victories</div>
              </div>
            </ListGroup.Item>}
          </div>)
      )}
      </ListGroup>
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

