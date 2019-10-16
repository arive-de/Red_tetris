const User = require('../models/User');

const createUser = (username, cb) => {
  const newUser = new User({
    username,
  })
  newUser.save()
  .then(user => {
    console.log(`new user ${user.username} added to db`)
    cb()
  })
  .catch(err => {
    console.log(err)
  })

}

const deleteUser = (username, cb) => {
  User.remove({ username })
  .then(user => {
    console.log(`user ${user.username} removed from db`)
    cb()
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = { createUser, deleteUser };
