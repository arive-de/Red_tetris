import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actSetUsername } from '../actions/user'
import openSocket from 'socket.io-client';

const Home = () => {
  const storeUsername = useSelector(state => state.username);
  const [username, setUserName] = useState('');
  const dispatch = useDispatch();
  const onChange = (e) => {
    e.preventDefault();
    setUserName(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const socket = openSocket('http://localhost:3004');
      dispatch(actSetUsername({ username, socket }));
    }
  }
  console.log(username);
  return (
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">Red tetris</h5>
          <div className="form-group d-flex flex-column align-items-center">
            <input className="form-control" onChange={onChange} placeholder='Type in a username' onKeyDown={handleKeyDown}></input>
          </div>
        </div>
      </div>
    )
}

export default (Home)