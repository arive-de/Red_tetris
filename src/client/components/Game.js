import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


export default function Game() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.username)
    const isPlaying = useSelector(state => state.isPlaying)
    const room = useSelector(state => state.gameList.find(r => r.roomId == state.roomId))
    if (room === undefined)  {
        return (<div>'Room doesn\'t exist anymore'</div>)
    }
    const onPlay = () => {
        console.log('lets play');
        socket.on('play', data => dispatch(actSetGameList(data)));
        socket.emit('play', room.roomId);
    }
    return (
        <div>
            <h2>Game </h2>
            <p>{isPlaying ? 'playing the game' : 'waiting for the game to start'}</p>
            {room.leader == username ?
            (<div><p>Im the leader</p><button onClick={onPlay}>Play</button></div>) :
            (<p>Im not the leader'}</p>)}
        </div>
    )
}
