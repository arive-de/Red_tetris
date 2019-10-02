import React,{  useState } from 'react'
import { withRouter }  from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { act_setusername } from '../actions/setusername'

const Home = (props) => {
  const storeUsername = useSelector(state => state.username);
  const [username, setUserName] = useState('');
  const dispatch = useDispatch();
  const onSubmit = () => {
      dispatch(act_setusername(username));
      props.history.push('/lobby');
    }
  console.log(storeUsername);
  return (
        <div>
            <h2>Home</h2>
            <input onChange={e => setUserName(e.target.value)} placeholder='Type in a username' ></input>
            <button onClick={onSubmit} type='submit' >Let's play</button>
        </div>
    )
}

export default withRouter(Home)