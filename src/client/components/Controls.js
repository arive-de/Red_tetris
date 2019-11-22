import React from 'react'

import './Controls.scss'

const Controls = () => {

  return (
    <div className='card card-container d-flex justify-content-center align-items-center text-center'>
      <h5 className='card-title'>Controls</h5>
      <div className='row'>
        <div>
         <i className='arrows invisible fas fa-caret-up'></i>
         <p className='invisible'></p>
        </div>
        <div>
          <i className='arrows fas fa-caret-up'></i>
          <p>Rotate right</p>
        </div>
        <div>
         <i className='arrows invisible fas fa-caret-up'></i>
         <p className='invisible'></p>
        </div>
      </div>
      <div className='row'>
        <div>
          <i className='arrows fas fa-caret-left'></i>
          <p>Move left</p>
        </div>
        <div>
         <i className='arrows fas fa-caret-down'></i>
         <p>Soft drop</p>
        </div>
        <div>
         <i className='arrows fas fa-caret-right'></i>
         <p>Move right</p>
        </div>
      </div>
      <div className='space-bar'>Space</div>
      <p>Hard drop</p>
    </div>
    )
}

export default (Controls)