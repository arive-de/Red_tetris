import React from 'react'

const GameList = ({ game }) => {

  return <tr>
        <td className='card-text'>{game.roomId}</td>
        <td className='card-text'>{game.type}</td>
        <td className='card-text'>{game.players.length}/4</td>
        <td className='card-text'>{!game.running ? 'Open' : 'Running'}</td>
      </tr>
}

// PUT ON CLICK MODAL

export default (GameList)
