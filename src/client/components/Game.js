import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actLeaveRoom } from '../actions/room'
import Header from './Header'

const Game = ({ solo, room }) => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)
  const [gamers, setGamers] = useState([true, true, true, true].slice(0, room.players.length))
  const [grid, setGrid] = useState(Array(200).fill(0))
  const [pieceType, setPieceType] = useState(0)
  const spectrums = useState(room.players.filter(u => u !== username).reduce((acc, user) => acc[user] = Array(10).fill(0)), {})

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

