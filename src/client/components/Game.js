import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actLeaveRoom, actStopGame } from '../actions/room'
import Header from './Header'
import classNames from 'classnames'
import './Game.scss'
import {
  pieces as startPieces,
  rotationTypes,
  rotationFuncs,
  canFit,
  canDrop,
  moveRight,
  moveLeft,
  updateGrid,
  addBlockLine,
  getSpectrum,
  dropBottom,
} from '../utils/pieces'

const SPACE = 32
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40


const Game = ({ solo, room }) => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.username)
  const socket = useSelector(state => state.socket)
  const [gamers, setGamers] = useState([true, true, true, true].slice(0, room.players.length))
  const [grid, setGrid] = useState(Array(200).fill(0))
  const [pieceType, setPieceType] = useState(0)
  const [pieces, setPieces] = useState([])
  const [piece, setPiece] = useState(null)
  const [lastPiece, setLastPiece] = useState(null)
  const spectrums = useState(room.players.filter(u => u !== username).reduce((acc, user) => acc[user] = Array(10).fill(0), {}))
  const savedCallback = useRef()
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

  const loopIntervalFunc = () => {
    console.log('in interval', piece, pieces)
    if (!piece) {
      return
    }
    setGrid(g => updateGrid(lastPiece, piece, pieceType, g))
    const [ok, nextPiece] = canDrop(piece, grid)
    if (ok) {
      setLastPiece(piece)
      setPiece(nextPiece)
      return
    }
    const newType = pieces[0]
    const newPiece = startPieces[newType]
    setPieceType(newType)
    setPiece(newPiece)
    setLastPiece(newPiece)
    setPieces(pieces.slice(1))
  }

  useEffect(() => {
    console.log('useEffect Game')
    console.log(pieces, piece, pieceType)
    savedCallback.current = loopIntervalFunc
  })

  useEffect(() => {
    console.log('Game useEffect [pieces]')
    console.log(pieces, piece)
    if (pieces.length === 3 && leader) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
    return () => {
    }
  }, [pieces])

  useEffect(() => {
    console.log('Game useEffect []')
    const intervalPiece = setInterval(() => {
      savedCallback.current()
    }, 700)
    if (leader) {
      socket.emit('get_pieces', { roomId: room.roomId, solo })
    }
    socket.on('get_pieces', newPieces => {
      const nextPieces = [...pieces, ...newPieces]
      const nextType = nextPieces[0]
      setPieceType(nextType)
      setPiece(startPieces[nextType])
      setLastPiece(startPieces[nextType])
      setPieces(nextPieces.slice(1))
    })
    return () => {
      console.log('unmount Game')
      socket.removeListener('get_pieces')
      clearInterval(intervalPiece)
    }
  }, [])

  const handleSpace = () => {
    const nextPiece = dropBottom(piece, grid)
    setLastPiece(piece)
    setPiece(nextPiece)
    setGrid(g => updateGrid(lastPiece, piece, pieceType, g))
  }
  
  const handleLeft = () => {
    const nextPiece = moveLeft(piece)
    if (!canFit(lastPiece, nextPiece, grid)) {
      return
    }
    setLastPiece(piece)
    setPiece(nextPiece)
    setGrid(g => updateGrid(lastPiece, piece, pieceType, g))
  }

  const handleRight = () => {
    const nextPiece = moveRight(piece)
    if (!canFit(lastPiece, nextPiece, grid)) {
      return
    }
    setLastPiece(piece)
    setPiece(nextPiece)
    setGrid(g => updateGrid(lastPiece, piece, pieceType, g))
  }

  const handleDown = () => {
    const [ok, nextPiece] = canDrop(piece, grid)
    if (!ok) {
      return
    }
    setLastPiece(piece)
    setPiece(nextPiece)
    setGrid(g => updateGrid(lastPiece, piece, pieceType, g))
  }

  const onKeyDown = (e) => {
    switch(e.keyCode) {
      case DOWN:
        console.log('DOWN')
        handleDown()
        break
      case UP:
        console.log('UP')
        break
      case SPACE:
        console.log('SPACE')
        handleSpace()
        break
      case LEFT:
        console.log('LEFT')
        handleLeft()
        break
      case RIGHT:
        console.log('RIGHT')
        handleRight()
        break
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
      <input id='gameControlsInput' onKeyDown={onKeyDown} tabIndex={-1} autoFocus></input>
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
            {
              grid.map((cell, i) => (
                <div className={classNames({
                  gridCell: true,
                  gridCell1: i % 2 === 0 ? true : false,
                  gridCell2: i % 2 !== 0 ? true : false,
                  [colors[cell]]: true
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