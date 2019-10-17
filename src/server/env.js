const User = require('./models/User')

export const initDb = () => {
  User.collection.drop().then(() => {
    User.create([{
      username: 'mama',
    },
      {
        username: 'alix',
      }])
            .then(() => {
              console.log('users created')
            })
            .catch(err => {
              console.log(err)
            })
  })
}
