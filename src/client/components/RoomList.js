import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actJoinRoom } from '../actions/room'
import './RoomList.scss'

const RoomList = ({ room }) => {
  const dispatch = useDispatch()
  const socket = useSelector(state => state.socket)
  const [showHover, setShowHover] = useState(false)
  const onJoin = () => {
    socket.emit('join_room', { roomId: room.roomId })
  }
  const handleMouseIn = () => {
    setShowHover(!showHover)
  }

  const handleMouseOut = () => {
    setShowHover(showHover)
  }

  return <div className='row d-flex justify-content-around'>
            <div className='card-text'>{room.roomId}</div>
            <div className='card-text'>{room.type}</div>
            <div className='col'>
              <div className='card-text' onMouseEnter={handleMouseIn}>{room.players.length}/4</div>
              {showHover && <div className='div-hover'>{room.players.map((m, index) => (
                <div key={index}>{m}</div>
              ))}</div>}
            </div>
            <div className='card-text'>{!room.running ? 'Open' : 'Running'}</div>
            <div className='card-text' onClick={onJoin}><button className='btn btn-primary'>join</button></div>
          </div>
}

// PUT ON CLICK MODAL

export default (RoomList)
