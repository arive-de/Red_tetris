const debug = require('debug')('∆:env')
const User = require('./models/User')
const Room = require('./models/Room')
const Highscore = require('./models/Highscore')

const fillDb = () => {
  return new Promise((resolve, reject) => {
    User.collection.deleteMany()
    .then(() => {
       User.create([{
        username: 'mama',
      },
        {
          username: 'alix',
        },
        {
          username: 'papa',
        },
        {
          username: 'lox',
        },
        {
          username: 'Joe',
        },
        {
          username: 'Robby',
        },
        {
          username: 'Diam',
        },
        {
          username: 'Pol',
        },
        {
          username: 'alox',
        }])
    })
    .then(() => Room.collection.deleteMany())
    .then(() => {
      debug('users created')
       Room.create([{
      roomId: 'xx04',
      type: 'Classic',
      players: ['lox', 'bob', 'prout', 'toupie'],
      running: false,
      leaderBoard: [0, 0, 0, 0],
      },
        {
        roomId: 'xx05',
        type: 'Classic',
        players: ['Joe', 'Robby'],
        running: false,
        leaderBoard: [3, 7],

        },
          {
        roomId: 'xx69',
        type: 'Ghost',
        players: ['Diam', 'Pol', 'alox'],
        running: true,
        leaderBoard: [1, 0, 5],

      },
         ])
    })
    .then(() => Highscore.collection.deleteMany())
    .then(() => {
      debug('rooms created')
       Highscore.create([{
        username: 'cbarbier',
        score: 35,
      },
        {
          username: 'arive-de',
          score: 4242,
        },
        {
          username: 'gschaetz',
          score: 3001,
        },
      ])
    })
    .then(() => {
      debug('Highscore created')
       resolve()
    })
    .catch(err => {
       reject(err)
    })
  })
}

module.exports = { fillDb }
