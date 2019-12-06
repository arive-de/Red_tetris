export const GET_ROOMS = 'GET_ROOMS'
export const CREATE_ROOM = 'CREATE_ROOM'
export const JOIN_ROOM = 'JOIN_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const PLAY_GAME = 'PLAY_GAME'
export const STOP_GAME = 'STOP_GAME'
export const QUIT_GAME = 'QUIT_GAME'

export const actCreateRoom = (room) => ({
  type: CREATE_ROOM,
  room,
})

export const actJoinRoom = ({ username, roomId }) => ({
  type: JOIN_ROOM,
  username,
  roomId,
})

export const actLeaveRoom = ({ username, roomId }) => ({
  type: LEAVE_ROOM,
  username,
  roomId,
})

export const actGetRooms = (rooms) => ({
  type: GET_ROOMS,
  rooms,
})

export const actPlayGame = (roomId) => ({
  type: PLAY_GAME,
  roomId,
})

export const actStopGame = (roomId) => ({
  type: STOP_GAME,
  roomId,
})

export const actQuitGame = (roomId) => ({
  type: QUIT_GAME,
  roomId,
})
