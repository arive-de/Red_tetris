import React from 'react'

const GameList = ({game}) => {

    return <tr>
        <td scope="row">{game.roomId}</td>
        <td>Classic</td>
        <td>{game.players.length}/4</td>
        <td>{!game.running ? 'Open' : 'Running'}</td>
      </tr>
}

// PUT ON CLICK MODAL

{/* <td>{game.players.map((m, index) => (
    <p className="card-text" key={index}>{m}</p>
    ))}</td> */} 



export default (GameList)


