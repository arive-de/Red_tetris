import React, { useEffect, useReducer } from 'react'
import './Spectrum.scss'
import classNames from 'classnames'

const Spectrum = ({ grid, username, mute }) => {
  const colors = ['emptyCell',
  'piece1', 'piece1',
  'piece2', 'piece2',
  'piece3', 'piece3',
  'piece4', 'piece4', 'piece4', 'piece4',
  'piece5', 'piece5', 'piece5', 'piece5',
  'piece6', 'piece6', 'piece6', 'piece6',
  'piece7']

  useEffect(() => {

    return () => {
    }
  }, [])
  if (mute) {
    return null
  }
  return (
    <div id='spectrumContainer'>
        {username}
              <div className='spectrumContainer w-100 d-flex flex-row flex-wrap'>
             {grid.map((cell, i) => (
                <div className={classNames({
                  gridCell: true,
                  gridCell1: i % 2 === 0,
                  gridCell2: i % 2 !== 0,
                  [colors[cell]]: true,
                }, 'spectrumCell')} key={i} >.</div>
              ))
            }
          </div>
      </div>
  )
}

export default (Spectrum)
