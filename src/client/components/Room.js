import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Game from './Game'
import Header from './Header'
import Invite from './Invite'
import ListGroup from 'react-bootstrap/ListGroup'
import Wall from './Wall'
import './Room.scss'

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

  const onReturn = () => {
    socket.emit('leave_room', { username, roomId: room.roomId })
  }

  useEffect(() => {

    console.log(room)

    socket.on('message', data => {
      setMessages(ms => [...ms, data].slice(-11))
    })
    return () => {
      socket.removeListener('message')
    }
  }, [])

  if (isPlaying) {
    return <Game room={room} solo={room.roomId === undefined ? true : false} />
  }

  const rankInfos = [['1st', 'warning'], ['2nd', 'secondary'], ['3rd', 'danger'], ['4th', 'light']]
  const sortedPlayers = room.players.map((p, i) => ({ username: p, score: room.leaderBoard[i] })).sort((a, b) => b.score - a.score)
  return (
    <div>
      <Wall />
      <Header title={`room ${room.roomId}`} onReturn={onReturn}></Header>
      <Invite room={room} />
    <div className='m-3 d-flex flex-column'>
      <div id='leaderBoard' className='w-50 align-self-center '>
      <ListGroup className='list-group'>
      { sortedPlayers.map((player, i) =>
          <ListGroup.Item variant={rankInfos[i][1]} key={i}>
            <div className='d-flex row justify-content-around p-2 bd-highlight'>
                <div className='' id ='rank'>{`${rankInfos[i][0]}`}</div>
                <div className=' font-weight-bold' id ='player'>{player.username}</div>
                <div className='' id ='victories'>{player.score} win{player.score > 1 ? 's' : ''}</div>
              </div>
            </ListGroup.Item>
      )}
      </ListGroup>
      </div>
      <div className='align-self-center m-4'>
      { username === room.players[0] ? <button id='playButton' className='btn btn-primary ' onClick={onPlay}>Play</button> : null }
      </div>
      <div id='chat' className='col-sm-12 align-self-center '>
        <div className='card'>
          <div id='logoChat' className='p-2'>
          <i className='fas fa-comment fa-spin fa-2x'></i>
          </div>
            <div id='messageBox' className='card-body overflow-hidden d-flex flex-column flex-nowrap'>
               { messages.map((m, index) => (
                <div className={`h-10 bg-${rankInfos[sortedPlayers.findIndex(p => p.username === username)][1]}`} key={index}>
                  <span className='font-weight-bold'>{m.username}:</span> {m.message.substr(0, 120)}
                </div>))}
            </div>
        </div>
        <div>
          <input id='messageInput' className='form-control' onChange={onChange} onKeyDown={sendMessage} placeholder='Say something...' value={message}></input>
        </div>
      </div>
      </div>
    </div>
    )
}
export default Room

