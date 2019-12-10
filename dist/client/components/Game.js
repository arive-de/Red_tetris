"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _room = require("../actions/room");

var _Header = _interopRequireDefault(require("./Header"));

var _Wall = _interopRequireDefault(require("./Wall"));

var _Spectrum = _interopRequireDefault(require("./Spectrum"));

var _classnames = _interopRequireDefault(require("classnames"));

var _game = require("../reducers/game");

var _pieces = require("../utils/pieces");

require("./Game.scss");

const SPACE = 32;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
let intervalPiece;

const Game = ({
  solo,
  room
}) => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const username = (0, _reactRedux.useSelector)(state => state.username);
  const intialGameState = {
    type: 0,
    piece: [],
    pieces: [],
    grid: Array(200).fill(0),
    spectrums: [0, 0, 0].map(x => Array(200).fill(0)),
    lines: 0,
    end: false,
    score: 0
  };
  const socket = (0, _reactRedux.useSelector)(state => state.socket);
  const [gamers, setGamers] = (0, _react.useState)([true, true, true, true].slice(0, room.players.length));
  const [gameState, dispatchGame] = (0, _react.useReducer)(_game.gameReducer, intialGameState);
  const leader = username === room.players[0];
  const players = room.players.filter(u => u !== username);

  const onStop = () => {
    if (solo) {
      dispatch((0, _room.actLeaveRoom)({
        username,
        roomId: room.roomId
      }));
      return;
    }

    socket.emit('gameOver', {
      index: room.players.indexOf(username)
    });
    dispatch((0, _room.actQuitGame)(room.roomId));
  };

  (0, _react.useEffect)(() => {
    console.log('useEffect Game');
  });
  (0, _react.useEffect)(() => {
    console.log('useEffect Game [gamers]');
    console.log(gamers);

    if (solo) {
      return;
    }

    if (gamers.filter(x => x).length === 1) {
      console.log('you won');
      socket.emit('stop_game', {
        roomId: room.roomId,
        solo: false,
        score: gameState.score
      });
    }
  }, [gamers]);
  (0, _react.useEffect)(() => {
    console.log('useEffect Game OVER');

    if (gameState.end) {
      if (solo) {
        console.log('you won');
        socket.emit('stop_game', {
          roomId: room.roomId,
          solo: true,
          score: gameState.score
        });
        return;
      }

      dispatch((0, _room.actQuitGame)(room.roomId));
      socket.emit('gameOver', {
        index: room.players.indexOf(username)
      });
    }
  }, [gameState.end]);
  (0, _react.useEffect)(() => {
    console.log('useEffect Game [lines]');
    console.log(`attack other with ${gameState.lines} lines..`);

    if (gameState.lines <= 1) {
      return;
    }

    socket.emit('blockLines', gameState.lines);
  }, [gameState.lines]);
  (0, _react.useEffect)(() => {
    console.log('Game useEffect [pieces]');

    if (!solo) {
      socket.emit('spectrum', (0, _pieces.getSpectrum)(gameState.grid, gameState.piece));
    }

    if (gameState.pieces.length === 4) {
      socket.emit('get_pieces', {
        roomId: room.roomId,
        solo
      });
    }

    return () => {};
  }, [gameState.pieces]);
  (0, _react.useEffect)(() => {
    console.log('Game useEffect []');
    intervalPiece = setInterval(() => {
      dispatchGame({
        type: 'TICK'
      });
    }, 700);

    if (leader) {
      socket.emit('get_pieces', {
        roomId: room.roomId,
        solo
      });
    }

    socket.on('get_pieces', newPieces => {
      dispatchGame({
        type: 'GET_PIECES',
        pieces: newPieces
      });
    });
    socket.on('spectrum', ({
      username,
      spectrum
    }) => {
      const indexPlayer = players.indexOf(username);
      dispatchGame({
        type: 'SPECTRUM',
        index: indexPlayer,
        spectrum
      });
    });
    socket.on('blockLines', lines => {
      console.log('blocklines listener', lines);
      dispatchGame({
        type: 'BLOCKLINES',
        lines: lines - 1
      });
    });
    socket.on('gameOver', ({
      index
    }) => {
      console.log(`${room.players[index]} is gameover`);
      setGamers(g => g.map((x, i) => i === index ? false : x));
    });
    return () => {
      console.log('unmount Game');
      socket.removeListener('get_pieces');
      socket.removeListener('spectrum');
      socket.removeListener('blockLines');
      socket.removeListener('gameOver');
      clearInterval(intervalPiece);
    };
  }, []);

  const onKeyUp = e => {
    if (gameState.piece === null) {
      return;
    } // console.log('onKeyUp', e)


    switch (e.keyCode) {
      case DOWN:
        console.log('DOWN');
        dispatchGame({
          type: 'SPEED'
        });
        return;

      case UP:
        console.log('UP');
        dispatchGame({
          type: 'ROTATE'
        });
        return;

      case SPACE:
        console.log('SPACE');
        dispatchGame({
          type: 'DROP'
        });
        clearInterval(intervalPiece);
        intervalPiece = setInterval(() => {
          dispatchGame({
            type: 'TICK'
          });
        }, 700);
        return;

      case LEFT:
        console.log('LEFT');
        dispatchGame({
          type: 'LEFT'
        });
        return;

      case RIGHT:
        console.log('RIGHT');
        dispatchGame({
          type: 'RIGHT'
        });
        return;

      default:
        console.log('useless key', e.keyCode);
    }
  };

  const colors = ['emptyCell', 'piece1', 'piece1', 'piece2', 'piece2', 'piece3', 'piece3', 'piece4', 'piece4', 'piece4', 'piece4', 'piece5', 'piece5', 'piece5', 'piece5', 'piece6', 'piece6', 'piece6', 'piece6'];
  const incomingPiece = gameState.piece.length ? _pieces.pieces[gameState.pieces[0]].map((x, i) => {
    if (x >= 30) return x - 21;
    if (x >= 20) return x - 15;
    if (x >= 10) return x - 9;
    if (x >= 0) return x - 3;
  }) : [];
  const incomingPieceGrid = Array(16).fill(0);
  incomingPiece.forEach(x => {
    incomingPieceGrid[x] = gameState.pieces[0] + 1 || 0;
  });
  return _react.default.createElement("div", null, _react.default.createElement(_Wall.default, {
    mute: true
  }), _react.default.createElement("input", {
    autoFocus: true,
    id: "gameControlsInput",
    onKeyDown: onKeyUp,
    tabIndex: -1
  }), _react.default.createElement(_Header.default, {
    onReturn: onStop,
    title: `GAME ${solo ? 'SOLO' : 'MULTIPLAYER'}`
  }), _react.default.createElement("div", {
    className: "d-flex justify-content-center"
  }, _react.default.createElement("div", {
    className: "d-flex flex-row justifiy-content-around flex-1 m-2",
    id: "gameContainer"
  }, _react.default.createElement("div", {
    className: "gameSide d-flex flex-column justify-content-between align-items-stretch w-25"
  }, _react.default.createElement("div", {
    className: "spectrum h-50 m-2"
  }, _react.default.createElement(_Spectrum.default, {
    mute: players.length < 1,
    grid: gameState.spectrums[0],
    username: players[0]
  })), _react.default.createElement("div", {
    className: "spectrum h-50 m-2"
  }, _react.default.createElement(_Spectrum.default, {
    mute: players.length < 2,
    grid: gameState.spectrums[1],
    username: players[1]
  }))), _react.default.createElement("div", {
    className: "w-50 m-2 d-flex flex-row flex-wrap",
    id: "gridContainer"
  }, gameState.end ? 'GAMEOVER' : gameState.grid.map((cell, i) => _react.default.createElement("div", {
    className: (0, _classnames.default)({
      gridCell: true,
      gridCell1: i % 2 === 0,
      gridCell2: i % 2 !== 0,
      [colors[cell]]: true,
      blockCell: cell === -1
    }),
    key: i
  }, cell))), _react.default.createElement("div", {
    className: "gameSide d-flex flex-column justify-content-between align-items-stretch w-25"
  }, _react.default.createElement("div", {
    className: "spectrum h-50 m-2"
  }, "incoming Piece", _react.default.createElement("div", {
    className: "d-flex flex-column"
  }, _react.default.createElement("div", {
    id: "incomingPiece",
    className: "d-flex flex-row flex-wrap w-100"
  }, incomingPieceGrid.map((cell, i) => _react.default.createElement("div", {
    className: (0, _classnames.default)({
      'incomingPieceCell': true,
      'bg-secondary': cell,
      gridCell1: i % 2 === 0,
      gridCell2: i % 2 !== 0
    }),
    key: i
  }, cell))), _react.default.createElement("div", {
    className: ""
  }, "SCORE: ", gameState.score))), _react.default.createElement("div", {
    className: "spectrum h-50 m-2"
  }, _react.default.createElement(_Spectrum.default, {
    mute: players.length < 3,
    grid: gameState.spectrums[2],
    username: players[2]
  }))))));
};

var _default = Game;
exports.default = _default;