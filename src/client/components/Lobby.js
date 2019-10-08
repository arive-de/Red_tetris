import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetGameList } from '../actions/gameList'
import GameList from './GameList'

const Lobby = () => {

    const dispatch = useDispatch();
    const username = useSelector(state => state.username)
    const gameList = useSelector(state => state.gameList)
    const socket = useSelector(state => state.socket)

    const onCreate = () => {
        socket.on('create', data => {
            console.log(`${username} socket client create`)
            dispatch(actSetGameList(data))
        });
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
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Room</th>
                        <th scope="col">Game</th>
                        <th scope="col">Players</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>

                    {gameList.map((game, index) => (
                        <GameList key={index} game={game} />
                    ))}
                </tbody>
                </table>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                <label className="form-check-label">
                Hide running and full tables
                </label>
            </div>
        </div>
    )
}

export default (Lobby)
