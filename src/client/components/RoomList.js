import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actJoinRoom } from '../actions/room'

const RoomList = ({ room }) => {
  const dispatch = useDispatch()
  const socket = useSelector(state => state.socket)
  const onJoin = () => {
    socket.emit('join_room', { roomId: room.roomId })
  }
  useEffect(() => {
    socket.on('joined_room', data => {
      console.log('joined new room', data)
      dispatch(actJoinRoom(data))
    })
    return () => {
      socket.removeListener('joined_room')
    }
  }, [])
  return <tr>
        <td className='card-text'>{room.roomId}</td>
        <td className='card-text'>{room.type}</td>
        <td className='card-text'>{room.players.length}/4</td>
        <td className='card-text'>{!room.running ? 'Open' : 'Running'}</td>
        <td className='card-text' onClick={onJoin}><button className='btn btn-primary'>join</button></td>
      </tr>
}

// PUT ON CLICK MODAL

export default (RoomList)
