import React, { useState } from 'react'
import './Invite.scss'

const Invite = ({ room }) => {
  const [friend, setFriend] = useState('')

  const onChange = (e) => {
    e.preventDefault()
    setFriend(e.target.value)
  }
  const onClick = () => {
    if (friend.length === 0 || room.players.indexOf(friend) !== -1) {
      return
    }
    const url = `${document.location.origin}/#${room.roomId}[${friend}]`
    console.log(url)
    navigator.clipboard.writeText(url)
  }
  return (
    <div className='d-flex flex-row justify-content-end'>
      <div className='' >
        <input id='friendInput' className='form-control' onChange={onChange} placeholder='Invite a friend' value={friend}></input>
      </div>
      <i id='friendButton' className='fas fa-link fa-2x' onClick={onClick}></i>
    </div>
  )
}

export default Invite