import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './SearchPlayer.scss'
import { join } from 'path'

const SearchPlayer = ({ rooms, onJoin }) => {
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

  const onJoinRoom = (user) => () => {
    const joinedRoom = rooms.find(r => r.players.indexOf(user) !== -1)
    if (joinedRoom === undefined) {
        return
    }
    onJoin(joinedRoom)
  }

  const onKeyDown = (e) => {

    if (e.keyCode === 13) {
      onJoinRoom(filteredSuggestions[activeSuggestion])()
      setShowSuggestions(false)
      setActiveSuggestion(0)
    }
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }

      setActiveSuggestion(x => x - 1)
    }
    else if (e.keyCode === 40) {

      console.log(filteredSuggestions)
      if (activeSuggestion === filteredSuggestions.length - 1) {
        return
      }
      setActiveSuggestion(x => x + 1)
    }
  }

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className='suggestions'>
          {filteredSuggestions.map((suggestion, index) => {
            let className
            if (index === activeSuggestion) {
              className = 'suggestion-active'
            }
            return (
              <li className={className} key={index} onClick={onJoinRoom(suggestion)}>
                {suggestion}
              </li>)
          })}
        </ul>
      )
    }
    else {
      suggestionsListComponent = (
        <div className='no-suggestions'>
          <em>No suggestions, you're on your own!</em>
        </div>
      )
    }
  }

  return (
    <Fragment>
        Connected players
        <div className='input-group'>
            <div className='input-group-prepend'>
                <span className='input-group-text' id='basic-addon1'><i className='fas fa-search'></i></span>
            </div>
            <input id='searchPlayerInput' className='form-control shadow-none' onChange={onChange} onKeyDown={onKeyDown} type='text' value={userInput}/>
        </div>
      {suggestionsListComponent}
    </Fragment>
  )
}

export default (SearchPlayer)
