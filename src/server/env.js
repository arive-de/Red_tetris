const User = require('./models/User')
const Room = require('./models/Room')

export const fillDb = () => {
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
      }])
            .then(() => {
              console.log('users created')
            })
            .catch(err => {
              reject()
              console.log(err)
            })
  
  Room.collection.deleteMany().then(() => {
    Room.create([{
      roomId: 'xx04',
      type: 'Classic',
      players: ['lox', 'bob', 'prout', 'toupie'],
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
         ])
           .then(() => {
             resolve()
             return console.log('rooms created')
           })
           .catch(err => {
             reject()
             return console.log(err)
           })
  })
})
})
}
