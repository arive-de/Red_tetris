"use strict";

const debug = require('debug')('∆:controller game spec');

const assert = require('assert');

const Room = require('../../models/Room');

const Highscore = require('../../models/Highscore');

const {
  connect,
  disconnect
} = require('../../helpers.spec');

const Game = require('./game');

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
        return;
      }

      Game.play(data.roomId, (err, data) => {
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
    Game.stop(testRoomId, (err, data) => {
      Room.findOne({
        roomId: testRoomId
      }).then(data => {
        assert(data.running === false);
        done();
      });
    });
  });
  it('setHighscore not ok', function (done) {
    Game.setHighscore('toto', 34, (err, data) => {
      assert(data === false);
      done();
    });
  });
  it('setHighscore ok', function (done) {
    Game.setHighscore('toto', 36, (err, data) => {
      Highscore.findOne({
        username: 'toto',
        score: 36
      }).then(() => {
        done();
      });
    });
  });
  it('setWins', function (done) {
    Game.setWins('michel', testRoomId, err => {
      Room.findOne({
        roomId: testRoomId
      }).then(room => {
        assert(room.leaderBoard[0] === 1);
        done();
      });
    });
  });
});