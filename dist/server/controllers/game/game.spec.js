"use strict";

const debug = require('debug')('∆:controller game spec');

const assert = require('assert');

const Room = require('../../models/Room');

const Highscore = require('../../models/Highscore');

const {
  connect,
  disconnect
} = require('../../helpers.spec');

const {
  playGame,
  stopGame,
  setHighscore,
  setWins
} = require('./game');

const {
  createRoom
} = require('../../controllers/room/room');

describe('Game Controller', function () {
  disconnect();
  connect();
  let testRoomId;
  it('play a game', function (done) {
    createRoom('michel', 'Classic', (err, data) => {
      if (err) {
        debug(err);
        done();
      }

      playGame(data.roomId, (err, data) => {
        testRoomId = data.roomId;
        Room.findOne({
          roomId: data.roomId
        }).then(data => {
          assert(data.running === true);
          done();
        });
      });
    });
  });
  it('stop a game', function (done) {
    stopGame(testRoomId, (err, data) => {
      Room.findOne({
        roomId: testRoomId
      }).then(data => {
        assert(data.running === false);
        done();
      });
    });
  });
  it('setHighscore not ok', function (done) {
    setHighscore('toto', 34, (err, data) => {
      assert(data === false);
      done();
    });
  });
  it('setHighscore ok', function (done) {
    setHighscore('toto', 36, (err, data) => {
      assert(data === true);
      Highscore.find({
        username: 'toto',
        score: 36
      }).then(() => {
        done();
      });
    });
  });
});