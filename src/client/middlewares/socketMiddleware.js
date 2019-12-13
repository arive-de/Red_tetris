import { CONNECT_SOCKET, INIT_GAME_SOCKET, actAddWin, actSetSocket, actLogout, actGetUsers, actGetHighscores, actSetUsername, actAddUser } from '../actions/user'
import { INIT_ROOM_SOCKET, actCreateRoom, actLeaveRoom, actJoinRoom, actGetRooms, actPlayGame, actStopGame } from '../actions/room'
import openSocket from 'socket.io-client'

const socketMiddleware = () => {
  return store => next => action => {
    const { dispatch } = store
    console.log('socketMiddleware', action, store)
    const storeSocket = store.getState().socket
    switch (action.type) {
    case CONNECT_SOCKET:
      console.log('connecting socket')
      const socket = openSocket(`http://${window.location.hostname}:3004`)
      socket.on('created_room', data => {
        dispatch(actCreateRoom(data))
      })
      socket.on('logout', data => {
        dispatch(actLogout(data))
      })
      socket.on('left_room', data => {
        dispatch(actLeaveRoom(data))
      })
      socket.on('joined_room', data => {
        dispatch(actJoinRoom(data))
      })
      socket.on('update', ({ users, rooms }) => {
        dispatch(actGetRooms(rooms))
        dispatch(actGetUsers(users))
      })
      socket.on('play_game', data => {
        dispatch(actPlayGame(data))
      })
      socket.on('stop_game', data => {
        dispatch(actStopGame(data))
      })
      socket.on('highscore', data => {
        dispatch(actGetHighscores(data))
      })
      socket.on('auth', data => {
        if (data.error) {
          action.setErrorHome(data.error)
          return
        }
        dispatch(actSetUsername(data.username))
        dispatch(actAddUser(data.username))
      })
      socket.on('lobby', data => {
        if (data.error) {
          action.setErrorLobby(data.error)
          return
        }
      })
      dispatch(actSetSocket(socket))
      break
    case INIT_GAME_SOCKET:
      const { dispatchGame, room, setGamers } = action
      storeSocket.on('get_pieces', newPieces => {
        dispatchGame({ type: 'GET_PIECES', pieces: newPieces })
      })
      storeSocket.on('spectrum', ({ username, spectrum }) => {
        const indexPlayer = players.indexOf(username)
        dispatchGame({ type: 'SPECTRUM', index: indexPlayer, spectrum })
      })
      storeSocket.on('blockLines', lines => {
        console.log('blocklines listener', lines)
        dispatchGame({ type: 'BLOCKLINES', lines: lines - 1 })
      })
      storeSocket.on('gameOver', ({ index, username }) => {
        console.log('gameover', username, index)
        const indexPlayer = index === -1 ? room.players.indexOf(username) : index
        console.log(`${room.players[indexPlayer]} is gameover`)
        setGamers(g => g.map((x, i) => i === indexPlayer ? false : x))
      })
      break
    case INIT_ROOM_SOCKET:
      storeSocket.on('message', data => {
        action.setMessages(ms => [...ms, data].slice(-11))
      })
      storeSocket.on('add_win', (username) => {
        dispatch(actAddWin(action.room.roomId, username))
      })
      break
    default:
      console.log(next)
      return next(action)
    }
  }
}

export default socketMiddleware
