"use strict";

const debug = require('debug')('∆:controller game');

const Room = require('../../models/Room');

const Highscore = require('../../models/Highscore');

const playGame = (roomId, cb) => {
  Room.findOne({
    roomId
  }).then(room => {
    room.running = true;
    room.save().then(r => {
      cb(null, {
        roomId
      });
    });
  }).catch(err => {
    cb(err.message);
  });
};

const stopGame = (roomId, cb) => {
  Room.findOne({
    roomId
  }).then(room => {
    room.running = false;
    room.save().then(r => {
      cb(null, {
        roomId
      });
    });
  }).catch(err => {
    cb(err.message);
  });
};

const setHighscore = async (username, score, cb) => {
  const newHighscore = new Highscore({
    username,
    score
  });
  const highscores = await Highscore.find({});
  console.log(highscores, newHighscore);
  const sortedHighScores = highscores.map(h => ({
    score: h.score,
    username: h.username
  })).sort((a, b) => a.score - b.score);

  if (sortedHighScores.some(h => h.score < score)) {
    await newHighscore.save();
    await Highscore.deleteOne(sortedHighScores[0]);
    console.log((await Highscore.find({})));
    cb(null, true);
    return;
  }

  cb(null, false);
};

const setWins = async (username, roomId, cb) => {
  const room = await Room.findOne({
    roomId
  });
  const indexPlayer = room.players.indexOf(username);

  if (indexPlayer >= 0) {
    room.leaderBoard[indexPlayer] += 1;
    await room.save();
  }

  cb(null);
};

module.exports = {
  playGame,
  stopGame,
  setHighscore,
  setWins
};