const debug = require('debug')('∆:controller game')
const Room = require('../../models/Room')
const Highscore = require('../../models/Highscore')

const playGame = (roomId, cb) => {
  Room.findOne({ roomId })
    .then(room => {
      room.running = true
      room.save()
      .then(r => {
        cb(null, { roomId })
      })
    })
    .catch(err => {
      cb(err.message)
    })
}

const stopGame = (roomId, cb) => {
  Room.findOne({ roomId })
    .then(room => {
      room.running = false
      room.save()
      .then(r => {
        cb(null, { roomId })
      })
    })
    .catch(err => {
      cb(err.message)
    })
}

const setHighscore = (username, score, cb) => {
  const newHighscore = new Highscore({
    username,
    score,
  })
  return Highscore.find()
  .then(highscores => {
    const sortedHighScores = highscores.map(h => ({
      score: h.score,
      username: h.username,
    })).sort((a, b) => a.score - b.score)
    return sortedHighScores
  })
  .then(sortedHighScores => {
    if (sortedHighScores.some(h => h.score < score)) {
      return newHighscore.save().then(() => {
        Highscore.deleteOne(sortedHighScores[0])
      })
      .then(() => {
        cb(null, true)
      })
    }
    cb(null, false)
  })
}

const setWins = (username, roomId, cb) => {
  Room.findOne({ roomId })
  .then(room => {
    const indexPlayer = room.players.indexOf(username)
    if (indexPlayer === -1) {
      return null
    }
    const newLeaderBoard = [...room.leaderBoard]
    newLeaderBoard[indexPlayer] = newLeaderBoard[indexPlayer] + 1
    room.leaderBoard = newLeaderBoard
    return room
  })
  .then(updatedRoom => {
    if (!updatedRoom) {
      return
    }
    return updatedRoom.save()
  })
  .then(() => {
    cb(null)
  })
}

module.exports = { playGame, stopGame, setHighscore, setWins }
