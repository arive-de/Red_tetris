import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './UserList.scss'

const UserList = () => {
  const userList = useSelector(state => state.userList)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState('')

  const onChange = (e) => {
    setUserInput(e.target.value)
    const filteredSuggestions = userList.filter((m) => {
      return m.startsWith(e.target.value)
    })

    setFilteredSuggestions(filteredSuggestions)
    setActiveSuggestion(0)
    setShowSuggestions(true)
  }

  const onClick = (e) => {

    setActiveSuggestion(0)
    setFilteredSuggestions([])
    setShowSuggestions(false)
    setUserInput(e.target.innerText)
  }

  const onKeyDown = (e) => {

    if (e.keyCode === 13) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
    }
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }

      setActiveSuggestion(activeSuggestion - 1)
    }
    else if (e.keyCode === 40) {

      console.log(filteredSuggestions)
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }

      setActiveSuggestion(activeSuggestion + 1)
    }
  }

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className='suggestions'>
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            if (index === activeSuggestion) {
              className = 'suggestion-active'
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            )
          })}
        </ul>
      )
    } else {
      suggestionsListComponent = (
        <div className='no-suggestions'>
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  return (
    <Fragment>
      {/* <div className='card-header'> */}
        Connected players
        <div className='input-group'>
            <div className='input-group-prepend'>
                <span className='input-group-text' id='basic-addon1'><i className='fas fa-search'></i></span>
            </div>
            <input className='form-control' onChange={onChange} onKeyDown={onKeyDown} type='text' value={userInput}/>
        </div>
      {/* </div> */}
      {suggestionsListComponent}
    </Fragment>
  )
}

export default (UserList)
