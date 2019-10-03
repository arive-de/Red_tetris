import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import openSocket from 'socket.io-client';
import { actSetGameList } from '../actions/gameList'

const socket = openSocket('http://localhost:3004');

const GameList = ({game}) => {
    return <div>
        Players: {game.players} <br />
        {!game.running ? 'waiting for players' : 'running'} <br />
        roomId: {game.roomId} <br />
    </div>
}

const Lobby = () => {

    const dispatch = useDispatch();
    const username = useSelector(state => state.username)
    const gameList = useSelector(state => state.gameList)

    const onCreate = () => {
        socket.on('create', data => dispatch(actSetGameList(data)));
        socket.emit('create', username);
    }
    return (
        <div>
            <h2>Lobby</h2>
            <button>Training</button>
            <button onClick={onCreate}>Create</button>
            <button>High Scores</button>
            <button>Settings</button>
            <div>
                <div>
                    {gameList.map((game, index) => (
                        <GameList key={index} game={game} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default (Lobby)
