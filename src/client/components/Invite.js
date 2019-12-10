import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Invite.scss'

const Invite = ({ room }) => {
  const [friend, setFriend] = useState('')
  const [info, setInfo] = useState(null)
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
    navigator.clipboard.writeText(url).then(() => {
      setInfo(info => 'invitation URL copied to clipboard :)')
    })
  }
  useEffect(() => {
    if (!info) {
      return
    }
    const timeout = setTimeout(() => {
        setInfo(null)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  })
  return (
    <div>
      {info && (<div className='error alert alert-success'></div>)}
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