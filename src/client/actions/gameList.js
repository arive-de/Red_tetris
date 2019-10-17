import { get } from "https"

export const SET_GAMELIST = 'SET_GAMELIST'
export const JOIN_GAMELIST = 'JOIN_GAMELIST'
export const LEAVE_GAMELIST = 'LEAVE_GAMELIST'
export const LEAVE_MASTER_GAMELIST = 'LEAVE_MASTER_GAMELIST'

export const actSetGameList = (game) => ({
  type: SET_GAMELIST,
  game,
})

export const actJoinGameList = ({ username, roomId }) => ({
  type: JOIN_GAMELIST,
  username,
  roomId,
})

export const actLeaveGameList = ({ username, roomId }) => ({
  type: LEAVE_GAMELIST,
  username,
  roomId,
})

export const actLeaveMasterGameList = ({ username, roomId }) => ({
  type: LEAVE_MASTER_GAMELIST,
  username,
  roomId,
})
