import React from 'react'
import { BrowserRouter as Redirect, withRouter } from "react-router-dom";

const Home = props => {

    const enterLobby = () => {
        props.history.push("/lobby")
    }

    return (
        <div>
            <h2>Home</h2>
            <input placeholder="Type in a username"></input>
            <button onClick={enterLobby}>Let's play</button>
        </div>
    )
}

export default withRouter(Home)