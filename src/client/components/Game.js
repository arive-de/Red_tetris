import React, { useEffect, useState, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actLeaveRoom, actStopGame } from '../actions/room'
import Header from './Header'
import Wall from './Wall'
import Spectrum from './Spectrum'
import classNames from 'classnames'
import { gameReducer } from '../reducers/game'
import { pieces as startPieces,
          getSpectrum } from '../utils/pieces'
import './Game.scss'

const SPACE = 32
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40

let intervalPiece
const Game = ({ solo, room }) => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const intialGameState = {
    type: 0,
    piece: [],
    pieces: [],
    grid: Array(200).fill(0),
    spectrums: [0, 0, 0].map(x => Array(200).fill(0)),
    lines: 0,
    end: false,
    score: 0,
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
    console.log('useEffect Game OVER')
  }, [gameState.end])

  useEffect(() => {
    console.log('useEffect Game [lines]')
    console.log(`attack other with ${gameState.lines} lines`)
    if (gameState.lines <= 1) {
      return
    }
    socket.emit('blockLines', gameState.lines)
  }, [gameState.lines])

  useEffect(() => {
    console.log('Game useEffect [pieces]')
    if (!solo) {
      socket.emit('spectrum', getSpectrum(gameState.grid, gameState.piece))
    }
    if (gameState.pieces.length === 4) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
    return () => {
    }
  }, [gameState.pieces])

  useEffect(() => {
    console.log('Game useEffect []')
    intervalPiece = setInterval(() => {
      dispatchGame({ type: 'TICK' })
    }, 700)
    if (leader) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
    socket.on('get_pieces', newPieces => {
      dispatchGame({ type: 'GET_PIECES', pieces: newPieces })
    })
    socket.on('spectrum', ({ username, spectrum }) => {
        const indexPlayer = players.indexOf(username)
        dispatchGame({ type: 'SPECTRUM', index: indexPlayer, spectrum })
    })
    socket.on('blockLines', lines => {
      console.log('blocklines listener', lines)
      dispatchGame({ type: 'BLOCKLINES', lines: lines - 1 })
      // socket.emit('spectrum', getSpectrum(gameState.grid, gameState.piece))
    })
    return () => {
      console.log('unmount Game')
      socket.removeListener('get_pieces')
      socket.removeListener('spectrum')
      clearInterval(intervalPiece)
    }
  }, [])

  const onKeyUp = (e) => {
    if (gameState.piece === null) {
      return
    }
    // console.log('onKeyUp', e)
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
      }, 700)
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
  const incomingPiece = gameState.piece.length ? startPieces[gameState.pieces[0]].map((x, i) => {
    if (x >= 30) return x - 21
    if (x >= 20) return x - 15
    if (x >= 10) return x - 9
    if (x >= 0) return x - 3
  }) : []
  const incomingPieceGrid = Array(16).fill(0)
  incomingPiece.forEach(x => { incomingPieceGrid[x] = gameState.pieces[0] + 1 || 0 })
  return (
    <div>
      <Wall mute={true} />
      <input autoFocus id='gameControlsInput' onKeyDown={onKeyUp} tabIndex={-1} />
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
            {gameState.end ? 'LOST' :
              gameState.grid.map((cell, i) => (
                <div className={classNames({
                  gridCell: true,
                  gridCell1: i % 2 === 0,
                  gridCell2: i % 2 !== 0,
                  [colors[cell]]: true,
                  blockCell: cell === -1,
                })} key={i} >{cell}</div>
              ))
            }
          </div>
          <div className='gameSide d-flex flex-column justify-content-between align-items-stretch w-25'>
            <div className='spectrum h-50 m-2'>
              incoming Piece
              <div className='d-flex flex-column'>
                <div id='incomingPiece' className='d-flex flex-row flex-wrap w-100'>
                  {
                    incomingPieceGrid.map((cell, i) =>
                    (<div className={classNames({
                      'incomingPieceCell': true,
                      'bg-secondary': cell,
                      gridCell1: i % 2 === 0,
                      gridCell2: i % 2 !== 0,
                    })} key={i} >{cell}</div>))
                  }
                </div>
                <div className=''>
                  SCORE: {gameState.score} 
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
