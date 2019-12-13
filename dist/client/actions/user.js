"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actAddWin = exports.actGetHighscores = exports.actGetUsers = exports.actLogout = exports.actAddUser = exports.actSetSocket = exports.actSetTypeGame = exports.actSetUsername = exports.actInitGameSocket = exports.actConnectSocket = exports.ADD_WIN = exports.GET_HIGHSCORES = exports.LOGOUT = exports.ADD_USER = exports.GET_USERS = exports.SET_SOCKET = exports.SET_TYPEGAME = exports.SET_USERNAME = exports.INIT_GAME_SOCKET = exports.CONNECT_SOCKET = void 0;
const CONNECT_SOCKET = 'CONNECT_SOCKET';
exports.CONNECT_SOCKET = CONNECT_SOCKET;
const INIT_GAME_SOCKET = 'INIT_GAME_SOCKET';
exports.INIT_GAME_SOCKET = INIT_GAME_SOCKET;
const SET_USERNAME = 'SET_USERNAME';
exports.SET_USERNAME = SET_USERNAME;
const SET_TYPEGAME = 'SET_TYPEGAME';
exports.SET_TYPEGAME = SET_TYPEGAME;
const SET_SOCKET = 'SET_SOCKET';
exports.SET_SOCKET = SET_SOCKET;
const GET_USERS = 'GET_USERS';
exports.GET_USERS = GET_USERS;
const ADD_USER = 'ADD_USER';
exports.ADD_USER = ADD_USER;
const LOGOUT = 'LOGOUT';
exports.LOGOUT = LOGOUT;
const GET_HIGHSCORES = 'GET_HIGHSCORES';
exports.GET_HIGHSCORES = GET_HIGHSCORES;
const ADD_WIN = 'ADD_WIN';
exports.ADD_WIN = ADD_WIN;

const actConnectSocket = (setErrorHome, setErrorLobby) => ({
  type: CONNECT_SOCKET,
  setErrorHome,
  setErrorLobby
});

exports.actConnectSocket = actConnectSocket;

const actInitGameSocket = (dispatchGame, setGamers, room) => ({
  type: INIT_GAME_SOCKET,
  dispatchGame,
  setGamers,
  room
});

exports.actInitGameSocket = actInitGameSocket;

const actSetUsername = username => ({
  type: SET_USERNAME,
  username
});

exports.actSetUsername = actSetUsername;

const actSetTypeGame = typeGame => ({
  type: SET_TYPEGAME,
  typeGame
});

exports.actSetTypeGame = actSetTypeGame;

const actSetSocket = socket => ({
  type: SET_SOCKET,
  socket
});

exports.actSetSocket = actSetSocket;

const actAddUser = username => ({
  type: ADD_USER,
  username
});

exports.actAddUser = actAddUser;

const actLogout = ({
  username,
  roomId
}) => ({
  type: LOGOUT,
  username,
  roomId
});

exports.actLogout = actLogout;

const actGetUsers = users => ({
  type: GET_USERS,
  users
});

exports.actGetUsers = actGetUsers;

const actGetHighscores = highscores => ({
  type: GET_HIGHSCORES,
  highscores
});

exports.actGetHighscores = actGetHighscores;

const actAddWin = (roomId, username) => ({
  type: ADD_WIN,
  roomId,
  username
});

exports.actAddWin = actAddWin;