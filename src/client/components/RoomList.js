import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actJoinRoom } from '../actions/room'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import classNames from 'classnames';
import './RoomList.scss'

const RoomList = ({ active, onClick, room }) => {
  const classes = classNames({
    'flex-table row': true,
    'color-row': active ? 'color-row' : '',
  })

  return (

    <div className={classes} onClick={onClick} role="rowgroup">
      <div className="flex-row first" role="cell">{room.roomId}</div>
      <div className="flex-row" role="cell">{room.type}</div>
      <OverlayTrigger
          key='top'
          placement='top'
          overlay={
            <Tooltip id='tooltip-top'>
              {room.players.map((m, index) => (
                <div key={index}>{m}</div>
              ))}
            </Tooltip>
          }
        >
        <div className="flex-row" role="cell">{room.players.length}/4</div>
      </OverlayTrigger>
      <div className="flex-row" role="cell">{!room.running ? 'Open' : 'Running'}</div>
    </div>
  )
}

// PUT ON CLICK MODAL

export default (RoomList)
