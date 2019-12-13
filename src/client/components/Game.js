import React, { useEffect, useState, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actLeaveRoom, actQuitGame, actCreateRoom, actPlayGame } from '../actions/room'
import Header from './Header'
import Wall from './Wall'
import Spectrum from './Spectrum'
import classNames from 'classnames'
import gameReducer from '../reducers/game'
import { pieces as startPieces,
          getSpectrum } from '../utils/pieces'
import './Game.scss'
import { actInitGameSocket } from '../actions/user'

const SPACE = 32
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const ENTER = 13
const LETTER_Q = 81

let intervalPiece
const Game = ({ solo, room }) => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const intialGameState = {
    type: 0,
    piece: [],
    pieces: [],
    grid: [...Array(200).fill(0)],
    spectrums: [0, 0, 0].map(() => Array(200).fill(0)),
    lines: 0,
    end: false,
    score: 0,
    lvl: 0,
  }
  const socket = useSelector(state => state.socket)
  const [gamers, setGamers] = useState([true, true, true, true].slice(0, room.players.length))
  const [gameState, dispatchGame] = useReducer(gameReducer, intialGameState)
  const leader = username === room.players[0]
  const players = room.players.filter(u => u !== username)

  const onStop = () => {
    if (solo) {
      dispatch(actLeaveRoom({ username, roomId: room.roomId }));
      return
    }
    socket.emit('gameOver', { index: room.players.indexOf(username) })
    dispatch(actQuitGame(room.roomId))
  }

  useEffect(() => {
    console.log('useEffect Game')
  })

  useEffect(() => {
    console.log('Game useEffect [gameState.grid]')
    if (!solo) {
      socket.emit('spectrum', getSpectrum(gameState.grid, gameState.piece))
    }
  }, [gameState.grid])

  useEffect(() => {
    console.log('Game useEffect [pieces]')
    if (gameState.pieces.length === 4) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
    return () => {
    }
  }, [gameState.pieces])

  useEffect(() => {
    console.log('useEffect Game [gamers]')
    console.log(gamers)
    if (solo) {
      return
    }
    if (gamers.filter(x => x).length === 1) {
      console.log('you won')
      socket.emit('stop_game', { roomId: room.roomId, solo: false, score: gameState.score })
    }
  }, [gamers])

  useEffect(() => {
    console.log('useEffect Game OVER')
    if (gameState.end) {
      if (solo) {
        console.log('you won')
        socket.emit('stop_game', { roomId: room.roomId, solo: true, score: gameState.score })
        return
      }
      socket.emit('spectrum', getSpectrum(gameState.grid, gameState.piece))
      dispatch(actQuitGame(room.roomId))
      socket.emit('gameOver', { index: room.players.indexOf(username) })
    }
    else if (leader) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
  }, [gameState.end])

  useEffect(() => {
    console.log('useEffect Game [lines]')
    console.log(`attack other with ${gameState.lines} lines..`)
    if (gameState.lines <= 1) {
      return
    }
    socket.emit('blockLines', gameState.lines)
  }, [gameState.lines])

  useEffect(() => {
    console.log('RESET INTERVAL')
    intervalPiece = setInterval(() => {
      dispatchGame({ type: 'TICK' })
    }, 700 - 50 * gameState.lvl)
    return () => {
      clearInterval(intervalPiece)
    }
  }, [gameState.lvl])

  useEffect(() => {
    console.log('Game useEffect []')
    if (leader) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
    dispatch(actInitGameSocket(dispatchGame, setGamers, room))
    
    return () => {
      console.log('unmount Game')
      socket.removeListener('get_pieces')
      socket.removeListener('spectrum')
      socket.removeListener('blockLines')
      socket.removeListener('gameOver')
    }
  }, [])

  const onKeyUp = (e) => {
    console.log('onKeyUp', e.keyCode)
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
      clearInterval(intervalPiece)
      intervalPiece = setInterval(() => {
        dispatchGame({ type: 'TICK' })
      }, 700 - 50 * gameState.lvl)
      return
    case LEFT:
      console.log('LEFT')
      dispatchGame({ type: 'LEFT' })
      return
    case RIGHT:
      console.log('RIGHT')
      dispatchGame({ type: 'RIGHT' })
      return
    case ENTER:
      if (gameState.end) {
        dispatchGame({ type: 'RESET' })
      }
      return
    case LETTER_Q:
      onStop()
      return
    default:
      console.log('useless key', e.keyCode)
    }
  }

  const colors = ['emptyCell',
                  'piece1', 'piece1', 'piece1', 'piece1',
                  'piece2', 'piece2', 'piece2', 'piece2',
                  'piece3', 'piece3', 'piece3', 'piece3',
                  'piece4', 'piece4', 'piece4', 'piece4',
                  'piece5', 'piece5', 'piece5', 'piece5',
                  'piece6', 'piece6', 'piece6', 'piece6',
                  'piece7', 'piece7', 'piece7', 'piece7']
  const buildIncomingPiece = n => {
    const incomingPiece = gameState.piece.length > n ? startPieces[gameState.pieces[n - 1]].map((x, i) => {
    if (x >= 30) return x - 21
    if (x >= 20) return x - 15
    if (x >= 10) return x - 9
    if (x >= 0) return x - 3 }) : []
    const incomingPieceGrid = Array(16).fill(0)
    if (room.type === 'Ghost') {
      return incomingPieceGrid.map(() => Math.floor(Math.random() * 28) + 1)
    }
    incomingPiece.forEach(x => { incomingPieceGrid[x] = gameState.pieces[n - 1] + 1 })
    return incomingPieceGrid.map((cell, i) =>
    (<div className={classNames({
      'incomingPieceCell': true,
      'bg-secondary': room.type === 'Classic' ? cell : false,
      gridCell1: i % 2 === 0,
      gridCell2: i % 2 !== 0,
      [colors[cell]]: room.type === 'Ghost',
    })} key={i} >{cell}</div>))
  }

  return (
    <div>
      <Wall mute={true} />
      <input autoComplete='off' autoFocus id='gameControlsInput' onKeyDown={onKeyUp} tabIndex={-1} />
      <Header onReturn={onStop} title={`GAME ${solo ? 'SOLO' : 'MULTIPLAYER'}`} />
      <div className='d-flex justify-content-center'>
        <div className='d-flex flex-row justifiy-content-around flex-1 m-2' id='gameContainer'>
          <div className='gameSide d-flex flex-column justify-content-between align-items-stretch w-25'>
            <div className='spectrum h-50 m-2'>
            <Spectrum mute={players.length < 1} grid={gameState.spectrums[0]} username={players[0]}/>
            </div>
            <div className='spectrum h-50 m-2'>
            <Spectrum mute={players.length < 2} grid={gameState.spectrums[1]} username={players[1]}/>
            </div>
          </div>
          <div className='w-50 m-2 d-flex flex-row flex-wrap' id='gridContainer'>
            {gameState.end ?
              (<div id='gameoverContainer' className='d-flex flex-column justify-content-around align-items-center w-100'>
                <div className='gameover h-50 w-100 align-items-stretch'>
                </div>
                <div className='h-50 w-100 d-flex flex-column justify-content-center align-items-center'>
                  <p id='retryParagraph'>type enter to retry</p>
                  <div>
                  <i className='fas fa-redo fa-3x fa-spin'></i>
                  </div>
                </div>
              </div>) :
              gameState.grid.map((cell, i) => (
                <div className={classNames({
                  gridCell: true,
                  gridCell1: i >= 0 && i % 2 === 0,
                  gridCell2: i >= 0 && i % 2 !== 0,
                  [colors[cell]]: true,
                  blockCell: cell === -1,
                })} key={i} >{cell}</div>
              ))
            }
          </div>
          <div className='gameSide d-flex flex-column justify-content-between align-items-stretch w-25'>
            <div className='infoTab h-50 m-2 d-flex flex-column justify-content-around'>
              <div className='d-flex flex-column h-100'>
                <div id='incomingPiece1' className='incomingPieceContainer d-flex flex-row flex-wrap w-100'>
                  {
                    buildIncomingPiece(1)
                  }
                </div>
                <div id='incomingPiece2' className='incomingPieceContainer d-flex flex-row flex-wrap w-100'>
                  {
                    buildIncomingPiece(2)
                  }
                </div>
                <div id='infoGameContainer' className='d-flex flex-column justify-content-around align-items-center'>
                  <div className='d-flex flex-column  align-items-center'>
                    <div>ScOre:</div>
                    <h3 className='label'>{gameState.score}</h3>
                  </div>
                  <div className='d-flex flex-column align-items-center'>
                    <div>LvL:</div>
                    <h3 className='label'>{gameState.lvl}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='spectrum h-50 m-2'>
            <Spectrum mute={players.length < 3} grid={gameState.spectrums[2]} username={players[2]}/>
            </div>
          </div>

        </div>
    </div>
    </div>
    )
}

export default Game
