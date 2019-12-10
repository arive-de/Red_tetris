import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './Invite.scss'

const Invite = ({ room }) => {
  const [friend, setFriend] = useState('')
  const hostname = useSelector(state => state.hostname)

  const onChange = (e) => {
    e.preventDefault()
    setFriend(e.target.value)
  }
  const onClick = () => {
    if (friend.length === 0 || room.players.indexOf(friend) !== -1) {
      return
    }

    const port = document.location.port

    const url = `${hostname}:${port}/#${room.roomId}[${friend}]`
    console.log(url)
    navigator.clipboard.writeText(url)
  }
  return (
    <div className='d-flex row justify-content-end'>
      <div className='' >
        <input id='friendInput' className='form-control' onChange={onChange} placeholder='Invite a friend' value={friend}></input>
      </div>
      <i id='friendButton' className='fas fa-link fa-2x' onClick={onClick}></i>
    </div>
  )
}

export default Invite