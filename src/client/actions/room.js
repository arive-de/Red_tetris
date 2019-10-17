export const GET_ROOMS = 'GET_ROOMS'
export const CREATE_ROOM = 'CREATE_ROOM'
export const JOIN_ROOM = 'JOIN_ROOM'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const LEAVE_MASTER_ROOM = 'LEAVE_MASTER_ROOM'

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

export const actLeaveMasterRoom = ({ username, roomId }) => ({
  type: LEAVE_MASTER_ROOM,
  username,
  roomId,
})

export const actGetRooms = (rooms) => ({
  type: GET_ROOMS,
  rooms,
  
})
