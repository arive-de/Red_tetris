import React, { useState, useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetTypeGame } from '../actions/user'
import ListGroup from 'react-bootstrap/ListGroup'
import Controls from './Controls'
import './Menu.scss'
import Game from './Game'
import { actCreateRoom, actPlayGame } from '../actions/room'
import classNames from 'classnames'
import { gameReducer } from '../reducers/game'
import pieces from '../utils/wall'

const Menu = () => {

  const dispatch = useDispatch()
  const highscores = useSelector(state => state.highscores)
  const socket = useSelector(state => state.socket)
  const username = useSelector(state => state.username)
  const roomId = useSelector(state => state.roomId)

  const [ p0, setP0 ] = useState(pieces[Math.floor(Math.random() * 18)])

  const [ grid, setGrid ] = useState(Array(1551).fill(0))

  const colors = ['emptyCell',
  'piece1', 'piece1',
  'piece2', 'piece2',
  'piece3', 'piece3',
  'piece4', 'piece4', 'piece4', 'piece4',
  'piece5', 'piece5', 'piece5', 'piece5',
  'piece6', 'piece6', 'piece6', 'piece6']

  const onClickMultiplayer = () => {
    dispatch(actSetTypeGame(true))
  }

  const onClickSolo = () => {
    dispatch(actCreateRoom({ roomId: undefined, players: [username], running: true, leaderBoard: [0] }))
    dispatch(actPlayGame(undefined))
  }

  const updateGrid = (newPiece, grid) => {
    const newGrid = [...grid]
    newPiece.forEach(x => {
      if (x < 1551) {
        newGrid[x] = 1
      }
    })
    return newGrid
  }

  useEffect(() => {

    const intervalPiece = setInterval(() => {

      setP0(p0.forEach((x, i) => p0[i] = x + 33))
      setGrid(updateGrid(p0, grid))
    }, 150)

    return () => {
      clearInterval(intervalPiece)
    }
  }, [])

  // FOR GAME Dev
  // onClickSolo()

  return (
    <div className='w-100 d-flex flex-row flex-wrap' id='gridContainer'>
      { grid.map((cell, i) => (
        <div className={classNames({
          wallCell: true,
          wallCell1: i % 2 === 0,
          wallCell2: i % 2 !== 0,
          [colors[cell]]: true,
        })} key={i} >{cell}</div>
      )) }
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
