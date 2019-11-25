// Room.js

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const HighscoreSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Highscores', HighscoreSchema)
