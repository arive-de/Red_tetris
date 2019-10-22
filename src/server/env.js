const User = require('./models/User')
const Room = require('./models/Room')

export const initDb = () => {
  User.collection.drop().then(() => {
    User.create([{
      username: 'mama',
    },
      {
        username: 'alix',
      },
      {
        username: 'papa',
      }])
            .then(() => {
              console.log('users created')
            })
            .catch(err => {
              console.log(err)
            })
  })
  Room.collection.drop().then(() => {
    Room.create([{
      roomId: 'xx04',
      type: 'Classic',
      players: ['lox', 'bob'],
      running: false,
      leader: 'lox',
    },
      {
        roomId: 'xx05',
        type: 'Classic',
        players: ['Joe', 'Robby'],
        running: false,
        leader: 'Joe',
      },
      {
        roomId: 'xx07',
        type: 'Classic',
        players: ['papa'],
        running: false,
        leader: 'papa',
      },
         ])
           .then(() => {
             console.log('rooms created')
           })
           .catch(err => {
             console.log(err)
           })
  })
}
