import React from 'react'

const RoomList = ({ room }) => {

  return <tr>
        <td className='card-text'>{room.roomId}</td>
        <td className='card-text'>{room.type}</td>
        <td className='card-text'>{room.players.length}/4</td>
        <td className='card-text'>{!room.running ? 'Open' : 'Running'}</td>
      </tr>
}

// PUT ON CLICK MODAL

export default (RoomList)
