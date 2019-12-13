"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _app = _interopRequireDefault(require("./containers/app"));

var _Home = _interopRequireDefault(require("./components/Home"));

var _Menu = _interopRequireDefault(require("./components/Menu"));

var _Lobby = _interopRequireDefault(require("./components/Lobby"));

var _Room = _interopRequireDefault(require("./components/Room"));

var _Game = _interopRequireDefault(require("./components/Game"));

var _SearchPlayer = _interopRequireDefault(require("./components/SearchPlayer"));

var _RoomList = _interopRequireDefault(require("./components/RoomList"));

var _Invite = _interopRequireDefault(require("./components/Invite"));

var _user = require("./actions/user");

var _room = require("./actions/room");

var _env = require("../server/env");

var _socket = _interopRequireDefault(require("socket.io-client"));

const debug = require('debug')('∆:app spec');

describe('App component', () => {
  let store;
  let wrapper;
  let username;
  let roomId;
  before(function (done) {
    const initialState = {
      username: null,
      typeGame: false,
      isPlaying: false,
      roomId: null,
      spectr: [],
      socket: null,
      rooms: [{
        roomId: 'test',
        players: ['john'],
        running: false,
        type: 'Classic',
        leaderBoard: [0]
      }, {
        roomId: '2test',
        players: ['jane', 'brad', 'mama', 'oaoa'],
        running: true,
        type: 'Ghost',
        leaderBoard: [0, 2, 8, 0]
      }],
      userList: ['mama', 'mimi', 'jane', 'john', 'oaoa'],
      highscores: [],
      socket: (0, _socket.default)()
    };
    store = (0, _redux.createStore)(_reducers.default, initialState);
    username = 'tester';
    roomId = 'xx01234';
    wrapper = (0, _enzyme.mount)(_react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_app.default, null)));
    done();
  });
  it('initial state', function (done) {
    const state = store.getState();
    expect(state.username).to.equal(null);
    expect(state.typeGame).to.equal(false);
    expect(state.isPlaying).to.equal(false);
    expect(state.roomId).to.equal(null);
    expect(wrapper.find(_Home.default)).to.have.length(1);
    wrapper.find(_Home.default).find('input').simulate('keyDown', {
      target: {
        key: 'Enter'
      }
    });
    done();
  });
  it('setting username', function (done) {
    store.dispatch((0, _user.actSetUsername)(username));
    const state = store.getState();
    state.socket.disconnect();
    expect(state.username).to.equal(username);
    wrapper.update();
    expect(wrapper.find(_Menu.default)).to.have.length(1);
    done();
  });
  it('setting the type game', function (done) {
    store.dispatch((0, _user.actSetTypeGame)(true));
    const state = store.getState();
    expect(state.typeGame).to.equal(true);
    wrapper.update();
    expect(wrapper.find(_Lobby.default)).to.have.length(1);
    wrapper.find(_SearchPlayer.default).find('input').simulate('change', {
      target: {
        value: 'm'
      }
    });
    expect(wrapper.find(_SearchPlayer.default).find('li')).to.have.length(2);
    wrapper.find(_SearchPlayer.default).find('input').simulate('change', {
      target: {
        value: 'jane'
      }
    });
    wrapper.find(_SearchPlayer.default).find('input').simulate('keyDown', {
      keyCode: 38
    });
    wrapper.find(_SearchPlayer.default).find('input').simulate('keyDown', {
      keyCode: 40
    });
    wrapper.find(_SearchPlayer.default).find('li').simulate('click');
    wrapper.find(_Lobby.default).find('select').simulate('change', {
      target: {
        value: 'Ghost'
      }
    });
    expect(wrapper.find(_Lobby.default).find('select').prop('value')).to.equal('Ghost');
    wrapper.find('i.sort').forEach(i => {
      i.simulate('click');
      expect(wrapper.find(_RoomList.default)).to.have.length(2);
    });
    wrapper.find(_Lobby.default).find('input#hide').simulate('click');
    wrapper.find(_Lobby.default).find('Button#joinRoomButton').simulate('click');
    done();
  });
  it('create a room', function (done) {
    store.dispatch((0, _room.actCreateRoom)({
      roomId,
      players: [username],
      running: false,
      type: 'Classic',
      leaderBoard: [0]
    }));
    const state = store.getState();
    expect(state.roomId).to.equal(roomId);
    wrapper.update();
    expect(wrapper.find(_Room.default)).to.have.length(1);
    expect(wrapper.find(_Room.default).props().room.roomId).to.equal(roomId);
    wrapper.find(_Room.default).find('input#messageInput').simulate('change', {
      target: {
        value: 'message'
      }
    });
    expect(wrapper.find(_Room.default).find('input#messageInput').prop('value')).to.equal('message');
    wrapper.find(_Room.default).find('input#messageInput').simulate('keyDown', {
      target: {
        key: 'Enter'
      }
    });
    wrapper.find(_Invite.default).find('#friendButton').simulate('click');
    wrapper.find(_Invite.default).find('input#friendInput').simulate('change', {
      target: {
        value: 'testfriend'
      }
    });
    expect(wrapper.find(_Invite.default).find('input#friendInput').prop('value')).to.equal('testfriend');
    wrapper.find(_Room.default).find('.leaveButton').simulate('click');
    done();
  });
  it('let s play a game', function (done) {
    store.dispatch((0, _room.actPlayGame)(roomId));
    const state = store.getState();
    expect(state.isPlaying).to.equal(true);
    wrapper.update();
    expect(wrapper.find(_Game.default)).to.have.length(1);
    expect(wrapper.find(_Game.default).props().room.running).to.equal(true);
    done();
  });
  it('fill 2lines', function (done) {
    const SPACE = 32;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const controls = wrapper.find('input#gameControlsInput');
    const socket = store.getState().socket;
    controls.simulate('keyDown', {
      keyCode: LEFT
    });
    controls.simulate('keyDown', {
      keyCode: LEFT
    });
    controls.simulate('keyDown', {
      keyCode: LEFT
    });
    wrapper.update();
    controls.simulate('keyDown', {
      keyCode: LEFT
    });
    controls.simulate('keyDown', {
      keyCode: LEFT
    });
    controls.simulate('keyDown', {
      keyCode: LEFT
    });
    wrapper.update();
    controls.simulate('keyDown', {
      keyCode: RIGHT
    });
    controls.simulate('keyDown', {
      keyCode: RIGHT
    });
    controls.simulate('keyDown', {
      keyCode: RIGHT
    });
    wrapper.update();
    controls.simulate('keyDown', {
      keyCode: RIGHT
    });
    controls.simulate('keyDown', {
      keyCode: RIGHT
    });
    controls.simulate('keyDown', {
      keyCode: RIGHT
    });
    wrapper.update();
    done();
  });
  after(function (done) {
    wrapper.unmount();
    (0, _env.fillDb)().then(() => {
      done();
    });
  });
});