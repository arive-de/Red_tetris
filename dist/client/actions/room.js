"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actQuitGame = exports.actStopGame = exports.actPlayGame = exports.actGetRooms = exports.actLeaveRoom = exports.actJoinRoom = exports.actCreateRoom = exports.actInitRoomSocket = exports.QUIT_GAME = exports.STOP_GAME = exports.PLAY_GAME = exports.LEAVE_ROOM = exports.JOIN_ROOM = exports.CREATE_ROOM = exports.GET_ROOMS = exports.INIT_ROOM_SOCKET = void 0;
const INIT_ROOM_SOCKET = 'INIT_ROOM_SOCKET';
exports.INIT_ROOM_SOCKET = INIT_ROOM_SOCKET;
const GET_ROOMS = 'GET_ROOMS';
exports.GET_ROOMS = GET_ROOMS;
const CREATE_ROOM = 'CREATE_ROOM';
exports.CREATE_ROOM = CREATE_ROOM;
const JOIN_ROOM = 'JOIN_ROOM';
exports.JOIN_ROOM = JOIN_ROOM;
const LEAVE_ROOM = 'LEAVE_ROOM';
exports.LEAVE_ROOM = LEAVE_ROOM;
const PLAY_GAME = 'PLAY_GAME';
exports.PLAY_GAME = PLAY_GAME;
const STOP_GAME = 'STOP_GAME';
exports.STOP_GAME = STOP_GAME;
const QUIT_GAME = 'QUIT_GAME';
exports.QUIT_GAME = QUIT_GAME;

const actInitRoomSocket = (setMessages, room) => ({
  type: INIT_ROOM_SOCKET,
  setMessages,
  room
});

exports.actInitRoomSocket = actInitRoomSocket;

const actCreateRoom = room => ({
  type: CREATE_ROOM,
  room
});

exports.actCreateRoom = actCreateRoom;

const actJoinRoom = ({
  username,
  roomId
}) => ({
  type: JOIN_ROOM,
  username,
  roomId
});

exports.actJoinRoom = actJoinRoom;

const actLeaveRoom = ({
  username,
  roomId
}) => ({
  type: LEAVE_ROOM,
  username,
  roomId
});

exports.actLeaveRoom = actLeaveRoom;

const actGetRooms = rooms => ({
  type: GET_ROOMS,
  rooms
});

exports.actGetRooms = actGetRooms;

const actPlayGame = roomId => ({
  type: PLAY_GAME,
  roomId
});

exports.actPlayGame = actPlayGame;

const actStopGame = roomId => ({
  type: STOP_GAME,
  roomId
});

exports.actStopGame = actStopGame;

const actQuitGame = roomId => ({
  type: QUIT_GAME,
  roomId
});

exports.actQuitGame = actQuitGame;