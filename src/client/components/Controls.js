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
          <p className='controlText'>Rotate right</p>
        </div>
        <div>
         <i className='arrows invisible fas fa-caret-up'></i>
         <p className='invisible'></p>
        </div>
      </div>
      <div className='row'>
        <div>
          <i className='arrows fas fa-caret-left'></i>
          <p className='controlText'>left</p>
        </div>
        <div>
         <i className='arrows fas fa-caret-down'></i>
         <p className='controlText'>soft drop</p>
        </div>
        <div>
         <i className='arrows fas fa-caret-right'></i>
         <p className='controlText'>right</p>
        </div>
      </div>
      <div className='space-bar'>Space</div>
      <p className='controlText'>Hard drop</p>
    </div>
    )
}

export default (Controls)