import React, { useEffect } from 'react'
import Navbar from 'react-bootstrap/navbar'

const Header = ({ error, setError, title, onReturn }) => {
  useEffect(() => {
    if (!error) {
      return
    }
    const timeout = setTimeout(() => {
      setError(e => null)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  })
  return (
    <div>
        { error && (<div className='error alert alert-danger'>
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
