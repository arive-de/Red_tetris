import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetTypeGame } from '../actions/user'
import Controls from './Controls'
import './Menu.scss'

const Menu = () => {

  const dispatch = useDispatch()

  const onMultiplayer = () => {

    dispatch(actSetTypeGame(true))
  }

  return (
    <div className='d-flex flex-column justify-content-around' id='menu-box'>
      <div className=' align-self-center'>
        <div className='card-container card text-center'>
          <h5 className='card-title'>Menu</h5>
          <div>
            <button className='btn btn-primary' >Solo</button>
          </div>
          <div>
            <button className='btn btn-primary' onClick={onMultiplayer}>Multiplayer</button>
          </div>
          {/* <div>
            <button className='btn btn-primary'>Controls</button>            
          </div>
          <div>
            <button className='btn btn-primary'>High Scores</button>          
          </div> */}
        </div>
      </div>
        <div className='align-self-center'>
          <Controls></Controls>
        </div>
    </div>
  )
}

export default (Menu)
