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
    <div className='card'>
      <div className='card-body'>
          <h5 className='card-title'>Menu</h5>
            <button className='btn btn-primary' >Solo</button>
            <button className='btn btn-primary' onClick={onMultiplayer}>Multiplayer</button>
            <button className='btn btn-primary'>Controls</button>
            <button className='btn btn-primary'>High Scores</button>
      </div>
    </div>
  )
}

export default (Menu)


