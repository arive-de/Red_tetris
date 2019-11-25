import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actLeaveRoom } from '../actions/room'
import Header from './Header'

const Game = ({ solo, room }) => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)
  const [gamers, setGamers] = useState([true, true, true, true].slice(0, room.players.length))

  const onStop = () => {
    if (solo) {
      dispatch(actLeaveRoom({ username, roomId: room.roomId }));
      return
    }
    if (room.players.length === 1) {
      socket.emit('stop_game', { roomId: room.roomId })
    }
  }

  useEffect(() => {
    console.log('Game component useEffect')
    return () => {
    }
  }, [])

  return (
    <div>
      <Header title={`GAME ${room.players.length > 1 ? 'MULTIPLAYER' : 'SOLO'}`} onReturn={onStop} />
      <div className='card text-center'>
        LET s CODE THE GAME
       </div>
    </div>
    )
}

export default Game

