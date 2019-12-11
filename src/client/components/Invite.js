import React, { useState, useEffect } from 'react'
import './Invite.scss'

const Invite = ({ room }) => {
  const [friend, setFriend] = useState('')
  const [info, setInfo] = useState(null)

  const onChange = (e) => {
    e.preventDefault()
    setFriend(e.target.value)
  }
  const onClick = () => {
    if (friend.length === 0 || room.players.indexOf(friend) !== -1) {
      return
    }
    const url = `${document.location.hostname}:${document.location.port}/#${room.roomId}[${friend}]`
    navigator.clipboard.writeText(url).then(() => {
      setInfo('invitation URL copied to clipboard :)')
    })
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
        setInfo(null)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  })
  return (
    <div>
      {info !== null && (<div className='invite-alert alert alert-success'>{info}</div>)}
    <div className='d-flex row justify-content-end'>
      <div className='' >
        <input id='friendInput' className='form-control' onChange={onChange} placeholder='Invite a friend' value={friend}></input>
      </div>
      <i id='friendButton' className='fas fa-link fa-2x' onClick={onClick}></i>
    </div>
    </div>
  )
}

export default Invite