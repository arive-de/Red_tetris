import React from 'react'
import './PlayerList.scss'

const PlayerList = () => {

  return <div className='card w-50'>

        <div className='card-header'>
            Connected players
        </div>
        <div className='card-body'>
            <div className='row'>
                <span className='dot'></span>
                <p className='card-text'>arive-de (en dur)</p>
            </div>
            <div className='row'>
                <span className='dot'></span>
                <p className='card-text'>cbarbier (en dur)</p>
            </div>
        </div>
    </div>
}

export default (PlayerList)
