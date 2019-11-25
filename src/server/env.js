const debug = require('debug')('∆:env')
const User = require('./models/User')
const Room = require('./models/Room')

const fillDb = () => {
  return new Promise((resolve, reject) => {
  User.collection.deleteMany().then(() => {
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
            .then(() => {
              debug('users created')
            })
            .catch(err => {
              reject()
              debug(err)
            })
  
  Room.collection.deleteMany().then(() => {
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
           .then(() => {
             resolve()
             return debug('rooms created')
           })
           .catch(err => {
             reject()
             return debug(err)
           })
  })
})
})
}

module.exports = { fillDb }
