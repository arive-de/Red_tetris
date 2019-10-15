import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './PlayerList.scss'

const PlayerList = () => {

  const playerList = useSelector(state => state.playerList)

//   useEffect(() => {
    // fetch('http://localhost:3004/api/users')
    // .then((res) => res.json())
    // .then((data) => {

    //   console.log(data)

      // const playerList = useSelector(state => state.playerList)
//     })
//   }, [])

  return <div className='card w-50'>

        <div className='card-header'>
            Connected players
        </div>
        <div className='card-body'>
            {playerList.map((username, index) => (
                <div className='row' key={index}>
                    <span className='dot'></span>
                    <p className='card-text'>{username}</p>
                </div>
            ))}
        </div>
    </div>
}

export default (PlayerList)
