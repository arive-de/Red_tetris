import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetTypeGame } from '../actions/user'
import ListGroup from 'react-bootstrap/ListGroup'
import Controls from './Controls'
import './Menu.scss'
import Wall from './Wall'
import { actCreateRoom, actPlayGame } from '../actions/room'

const Menu = () => {

  const dispatch = useDispatch()
  const highscores = useSelector(state => state.highscores)
  const username = useSelector(state => state.username)

  const onClickMultiplayer = () => {
    dispatch(actSetTypeGame(true))
  }

  const onClickSolo = () => {
    dispatch(actCreateRoom({ roomId: undefined, players: [username], running: true, leaderBoard: [0] }))
    dispatch(actPlayGame(undefined))
  }
  // FOR GAME Dev
  // onClickSolo()

  return (
    <div>
      <Wall />
      <div className='d-flex flex-column justify-content-around' id='menu-box'>
        <div className='align-self-stretch' >
          <div className='d-flex row justify-content-around'>
            <ListGroup className='list-group'>
              {highscores.sort((a, b) => b.score - a.score).map((player, i) =>
              (<ListGroup.Item variant='warning' key={i}>
                <div className='d-flex row justify-content-around p-2 bd-highlight'>
                  <div><i className='fas fa-trophy'></i></div>'
                  <div className=' font-weight-bold' id ='highscoreUsername'>{player.username}</div>
                  <div className='' id ='highscoreScore'>{player.score} pts</div>
                </div>
              </ListGroup.Item>)
              )}
            </ListGroup>
          </div>
        </div>
        <div className=' align-self-center'>
          <div className='card-container card text-center'>
            <h5 className='card-title'>Menu</h5>
            <div> 
              <button className='btn btn-primary' onClick={onClickSolo} >Solo</button>
            </div>
            <div>
              <button className='btn btn-primary' onClick={onClickMultiplayer}>Multiplayer</button>
            </div>
          </div>
        </div>
        <div className='align-self-center'>
          <Controls></Controls>
        </div>
      </div>
    </div>  
  )
}

export default (Menu)
