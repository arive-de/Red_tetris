import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetTypeGame } from '../actions/user'

import './Menu.scss'

const Menu = () => {

  const dispatch = useDispatch()

  const onMultiplayer = () => {

    dispatch(actSetTypeGame(true))
  }

  return (
    <div className='container d-flex flex-row mx-auto'>
      <div className='card justify-content-center align-self-center mx-auto'>
        <div className='card-container card-body text-center'>
          <h5 className='card-title'>Menu</h5>
          <div>
            <button className='btn btn-primary' >Solo</button>
          </div>
          <div>
            <button className='btn btn-primary' onClick={onMultiplayer}>Multiplayer</button>
          </div>
          <div>
            <button className='btn btn-primary'>Controls</button>            
          </div>
          <div>
            <button className='btn btn-primary'>High Scores</button>          
          </div>
          </div>
      </div>
    </div>
  )
}

export default (Menu)
