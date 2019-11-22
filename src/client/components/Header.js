import React from 'react'
import { actSetTypeGame } from '../actions/user'
import { useDispatch } from 'react-redux'
import Navbar from 'react-bootstrap/navbar'
import Button from 'react-bootstrap/button'

const Header = ({ error, setError, title, onReturn }) => {
  return (
    <div>
        { error && (<div className='alert alert-danger' role='alert'>
          {error}
        </div>) }
        <Navbar>
          <Navbar.Brand><i className='leaveButton fas fa-arrow-alt-circle-left fa-2x' onClick={onReturn} /></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-center'>
            <Navbar.Text>
              <h2>{title}</h2>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
    </div>
    )
}

export default (Header)
