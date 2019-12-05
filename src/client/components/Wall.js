import React, { useEffect, useReducer } from 'react'
import './Wall.scss'
import { wallReducer } from '../utils/wall'
import classNames from 'classnames'

const Wall = ({ mute }) => {
  const [grid, dispatchGrid] = useReducer(wallReducer, Array(1551).fill(0))
  const colors = ['emptyCell',
  'piece1', 'piece1',
  'piece2', 'piece2',
  'piece3', 'piece3',
  'piece4', 'piece4', 'piece4', 'piece4',
  'piece5', 'piece5', 'piece5', 'piece5',
  'piece6', 'piece6', 'piece6', 'piece6',
  'piece7']

  useEffect(() => {
    if (mute) {
      return
    }
    const intervalPiece = setInterval(() => {
      console.log('interval Wall')
      dispatchGrid({ type: 'TICK' })
    }, 300)

    return () => {
      if (mute) {
        return
      }
      clearInterval(intervalPiece)
    }
  }, [])
  
  return (
    <div className='w-100 d-flex flex-row flex-wrap' id='wallContainer'>
      { grid.map((cell, i) => (
        <div className={classNames({
          wallCell: true,
          wallCell1: i % 2 === 0,
          wallCell2: i % 2 !== 0,
          [colors[cell]]: true,
        })} key={i} >{cell}</div>
      )) }
      </div>
  )
}

export default (Wall)
