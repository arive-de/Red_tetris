import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/Home'
import Lobby from '../components/Lobby'
import Game from '../components/Game'

const App = () =>
  (
    <Router>
      <div>
        <Switch>
          <Route path='/game'>
            <Game />
          </Route>
          <Route path='/lobby'>
            <Lobby />
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  )

  const mapStateToProps = state => ({
    message: state.message,
  })
  
  export default connect(mapStateToProps, null)(App)
  
