import React, { useEffect, useState, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actLeaveRoom, actStopGame } from '../actions/room'
import Header from './Header'
import classNames from 'classnames'
import { gameReducer } from '../reducers/game'
import './Game.scss'

const SPACE = 32
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40

const Game = ({ solo, room }) => {
  const intialGameState = {
    type: 0,
    piece: null,
    pieces: [],
    grid: Array(200).fill(0),
    spectrums: room.players.filter(u => u !== username).reduce((acc, user) => acc[user] = Array(10).fill(0), {}),
    end: false,
  }
  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)
  const [gamers, setGamers] = useState([true, true, true, true].slice(0, room.players.length))
  const [gameState, dispatchGame] = useReducer(gameReducer, intialGameState)
  const leader = username === room.players[0]

  const onStop = () => {
    if (solo) {
      dispatch(actLeaveRoom({ username, roomId: room.roomId }));
      return
    }
    if (gamers.filter(x => x).length === 1) {
      socket.emit('stop_game', { roomId: room.roomId })
    } else {
      dispatch(actStopGame(room.roomId))
    }
  }

  useEffect(() => {
    console.log('useEffect Game')
  })

  useEffect(() => {
    console.log('Game useEffect [pieces]')
    if (gameState.pieces.length === 3 && leader) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
    return () => {
    }
  }, [gameState.pieces])

  useEffect(() => {
    console.log('Game useEffect []')
    const intervalPiece = setInterval(() => {
      dispatchGame({ type: 'TICK' })
    }, 700)
    if (leader) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
    socket.on('get_pieces', newPieces => {
      dispatchGame({ type: 'GET_PIECES', pieces: newPieces })
      if (!gameState.end) {
        dispatchGame({ type: 'START' })
      }
    })
    return () => {
      console.log('unmount Game')
      socket.removeListener('get_pieces')
      clearInterval(intervalPiece)
    }
  }, [])

  const onKeyUp = (e) => {
    if (gameState.piece === null) {
      return
    }
    console.log('onKeyUp', e)
    switch (e.keyCode) {
    case DOWN:
      console.log('DOWN')
      dispatchGame({ type: 'SPEED' })
      return
    case UP:
      console.log('UP')
      dispatchGame({ type: 'ROTATE' })
      return
    case SPACE:
      console.log('SPACE')
      dispatchGame({ type: 'DROP' })
      return
    case LEFT:
      console.log('LEFT')
      dispatchGame({ type: 'LEFT' })
      return
    case RIGHT:
      console.log('RIGHT')
      dispatchGame({ type: 'RIGHT' })
      return
    default:
      console.log('useless key', e.keyCode)
    }
  }
  const colors = ['emptyCell',
                  'piece1', 'piece1',
                  'piece2', 'piece2',
                  'piece3', 'piece3',
                  'piece4', 'piece4', 'piece4', 'piece4',
                  'piece5', 'piece5', 'piece5', 'piece5',
                  'piece6', 'piece6', 'piece6', 'piece6']
  return (
    <div>
      <input autoFocus id='gameControlsInput' onKeyDown={onKeyUp} tabIndex={-1} />
      <Header onReturn={onStop} title={`GAME ${solo ? 'SOLO' : 'MULTIPLAYER'}`} />
      <div className='d-flex justify-content-center'>
        <div className='d-flex flex-row justifiy-content-around flex-1 m-2' id='gameContainer'>
          <div className='gameSide d-flex flex-column justify-content-between align-items-stretch w-25'>
            <div className='spectrum h-50 m-2'>
              spectrum 1
            </div>
            <div className='spectrum h-50 m-2'>
              spectrum 2
            </div>
          </div>
          <div className='w-50 m-2 d-flex flex-row flex-wrap' id='gridContainer'>
            {gameState.end ? 'LOST' :
              gameState.grid.map((cell, i) => (
                <div className={classNames({
                  gridCell: true,
                  gridCell1: i % 2 === 0,
                  gridCell2: i % 2 !== 0,
                  [colors[cell]]: true,
                })} key={i} >{cell}</div>
              ))
            }
          </div>
          <div className='gameSide d-flex flex-column justify-content-between align-items-stretch w-25'>
            <div className='spectrum h-50 m-2'>
              incoming Piece
            </div>
            <div className='spectrum h-50 m-2'>
              spectrum 3
            </div>
          </div>

        </div>
    </div>
    </div>
    )
}

export default Game
