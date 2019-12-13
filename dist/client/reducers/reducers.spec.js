"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reducers = _interopRequireDefault(require("../reducers"));

var _user = require("../actions/user");

var _room = require("../actions/room");

describe('user reducer', () => {
  let input;
  let expectedOutput;
  let action;
  it('SET_USERNAME', () => {
    action = (0, _user.actSetUsername)('tester');
    input = {
      username: null
    };
    expectedOutput = {
      username: 'tester'
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('SET_TYPEGAME', () => {
    action = (0, _user.actSetTypeGame)(true);
    input = {
      typeGame: false
    };
    expectedOutput = {
      typeGame: true
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('SET_SOCKET', () => {
    action = (0, _user.actSetSocket)('socket');
    input = {
      socket: null
    };
    expectedOutput = {
      socket: 'socket'
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('GET_USERS', () => {
    action = (0, _user.actGetUsers)(['user1', 'user2', 'user3']);
    input = {
      username: 'user0'
    };
    expectedOutput = {
      username: 'user0',
      userList: ['user1', 'user2', 'user3']
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('ADD_USER', () => {
    action = (0, _user.actAddUser)('newUser');
    input = {
      username: 'user0',
      userList: ['user1', 'user2', 'user3']
    };
    expectedOutput = {
      username: 'user0',
      userList: ['user1', 'user2', 'user3', 'newUser']
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('LOGOUT', () => {
    action = (0, _user.actLogout)({
      username: 'outUser',
      roomId: 'test'
    });
    input = {
      username: 'user0',
      userList: ['user1', 'user2', 'outUser', 'user3'],
      rooms: [{
        roomId: 'test',
        players: ['joe', 'outUser'],
        leaderBoard: [3, 0]
      }]
    };
    expectedOutput = {
      username: 'user0',
      userList: ['user1', 'user2', 'user3'],
      rooms: [{
        roomId: 'test',
        players: ['joe'],
        leaderBoard: [3]
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('LOGOUT 2', () => {
    action = (0, _user.actLogout)({
      username: 'outUser',
      roomId: 'test'
    });
    input = {
      username: 'user0',
      userList: ['user1', 'user2', 'outUser', 'user3'],
      rooms: [{
        roomId: 'test',
        players: ['outUser'],
        leaderBoard: [12]
      }]
    };
    expectedOutput = {
      username: 'user0',
      userList: ['user1', 'user2', 'user3'],
      rooms: []
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('GET_HIGHSCORES', () => {
    action = (0, _user.actGetHighscores)([{
      username: 'user1',
      score: 3
    }, {
      username: 'user2',
      score: 42
    }, {
      username: 'user3',
      score: 4200
    }]);
    input = {
      username: 'user0',
      highscores: []
    };
    expectedOutput = {
      username: 'user0',
      highscores: [{
        username: 'user1',
        score: 3
      }, {
        username: 'user2',
        score: 42
      }, {
        username: 'user3',
        score: 4200
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
});
describe('room reducer', () => {
  let input;
  let expectedOutput;
  let action;
  it('GET_ROOMS', () => {
    action = (0, _room.actGetRooms)([{
      roomId: 'someRoom'
    }, {
      roomId: 'test',
      type: 'Classic',
      players: ['tester'],
      running: false
    }]);
    input = {
      username: 'tester',
      rooms: [{
        roomId: 'otherRoom'
      }]
    };
    expectedOutput = {
      username: 'tester',
      rooms: [{
        roomId: 'someRoom'
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['tester'],
        running: false
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('CREATE_ROOM', () => {
    action = (0, _room.actCreateRoom)({
      roomId: 'test',
      type: 'Classic',
      players: ['tester'],
      running: false
    });
    input = {
      username: 'tester',
      rooms: [{
        roomId: 'someRoom'
      }]
    };
    expectedOutput = {
      username: 'tester',
      roomId: 'test',
      rooms: [{
        roomId: 'someRoom'
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['tester'],
        running: false
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('JOIN_ROOM', () => {
    action = (0, _room.actJoinRoom)({
      roomId: 'test',
      username: 'newPlayer'
    });
    input = {
      username: 'tester',
      roomId: null,
      rooms: [{
        roomId: 'someRoom'
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['john'],
        running: false,
        leaderBoard: [8]
      }]
    };
    expectedOutput = {
      username: 'tester',
      roomId: null,
      rooms: [{
        roomId: 'someRoom'
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['john', 'newPlayer'],
        running: false,
        leaderBoard: [8, 0]
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('LEAVE_ROOM', () => {
    action = (0, _room.actLeaveRoom)({
      roomId: 'test',
      username: 'john'
    });
    input = {
      username: 'tester',
      isPlaying: false,
      roomId: null,
      rooms: [{
        roomId: 'someRoom',
        players: ['michel']
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['john', 'newPlayer'],
        running: false,
        leaderBoard: [0, 0]
      }]
    };
    expectedOutput = {
      username: 'tester',
      isPlaying: false,
      roomId: null,
      rooms: [{
        roomId: 'someRoom',
        players: ['michel']
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['newPlayer'],
        running: false,
        leaderBoard: [0]
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('PLAY_GAME', () => {
    action = (0, _room.actPlayGame)('test');
    input = {
      username: 'tester',
      isPlaying: false,
      roomId: 'test',
      rooms: [{
        roomId: 'someRoom',
        players: ['michel']
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['tester', 'john', 'newPlayer'],
        running: false,
        leaderBoard: [0, 0, 0]
      }]
    };
    expectedOutput = {
      username: 'tester',
      isPlaying: true,
      roomId: 'test',
      rooms: [{
        roomId: 'someRoom',
        players: ['michel']
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['tester', 'john', 'newPlayer'],
        running: true,
        leaderBoard: [0, 0, 0]
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('STOP_GAME', () => {
    action = (0, _room.actStopGame)('test');
    input = {
      username: 'tester',
      isPlaying: true,
      roomId: 'test',
      rooms: [{
        roomId: 'someRoom',
        players: ['michel']
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['tester', 'john', 'newPlayer'],
        running: true,
        leaderBoard: [0, 0, 0]
      }]
    };
    expectedOutput = {
      username: 'tester',
      isPlaying: false,
      roomId: 'test',
      rooms: [{
        roomId: 'someRoom',
        players: ['michel']
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['tester', 'john', 'newPlayer'],
        running: false,
        leaderBoard: [0, 0, 0]
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
  it('QUIT_GAME', () => {
    action = (0, _room.actQuitGame)('test');
    input = {
      username: 'tester',
      isPlaying: true,
      roomId: 'test',
      rooms: [{
        roomId: 'someRoom',
        players: ['michel']
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['tester', 'john', 'newPlayer'],
        running: true,
        leaderBoard: [0, 0, 0]
      }]
    };
    expectedOutput = {
      username: 'tester',
      isPlaying: false,
      roomId: 'test',
      rooms: [{
        roomId: 'someRoom',
        players: ['michel']
      }, {
        roomId: 'test',
        type: 'Classic',
        players: ['tester', 'john', 'newPlayer'],
        running: true,
        leaderBoard: [0, 0, 0]
      }]
    };
    expect((0, _reducers.default)(input, action)).to.deep.equal(expectedOutput);
  });
});