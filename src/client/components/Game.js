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
        GAME {room.roomId}
       </div>
    </div>
    )
}

export default Game

