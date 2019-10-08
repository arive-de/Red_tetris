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
  const onSubmit = () => {
    const socket = openSocket('http://localhost:3004');
    dispatch(actSetUsername({ username, socket }));
  }
  console.log(username);
  return (
        <div>
            <h2>Home</h2>
            <input onChange={onChange} placeholder='Type in a username' ></input>
            <button onClick={onSubmit} type='submit' >Let's play</button>
        </div>
    )
}

export default (Home)