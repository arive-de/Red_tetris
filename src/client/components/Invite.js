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
    try {

      navigator.clipboard.writeText(url).then(() => {
        setInfo('invitation URL copied to clipboard :)')
        setFriend('')
      })
    }
    catch (e) {
      setInfo('can not copy url to clipboard')
    }
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
    <div className='d-flex justify-content-end'>
      {info !== null && (<div className='invite-alert alert alert-success'>{info}</div>)}
      <div className='input-group' id='invite-container'>
        <input autoComplete='off' className='form-control' id='friendInput' onChange={onChange} placeholder='Invite a friend' value={friend} />
        <div className='input-group-prepend'>
            <span className='input-group-text' id='basic-addon1'><i className='fas fa-link' id='friendButton' onClick={onClick} /></span>
        </div>
      </div>
    </div>
  )
}

export default Invite
