import React from 'react'

const GameList = ({game}) => {

    return <div className="card text-center">
            <div className="card-header">
                roomId: {game.roomId}
            </div>
            <div className="card-body">
                <h5 className="card-title">{!game.running ? 'waiting for players' : 'running'}</h5>
                {game.players.map((m, index) => (
                   <p className="card-text" key={index}>{m}</p>
                ))}
                <a href="#" className="btn btn-primary">Join</a>
            </div>
        </div>
}

export default (GameList)


