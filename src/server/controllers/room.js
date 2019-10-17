const Room = require('../models/Room');

const createRoom = (username, cb) => {

  console.log(username)

  const newRoom = new Room({
    players: [username],
    roomId: 'xx06',
    type: 'Classic',
    running: false,
  })

  newRoom.save()
    .then(username => {
      console.log(`new room added by ${username} to db`)
      cb()
    })
    .catch(err => {
      console.log(err)
      cb('can\'t store the user in db')
    })

}

const deleteUser = (username, cb) => {
  Room.remove({ username })
  .then(user => {
    console.log(`user ${user.username} removed from db`)
    cb()
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = { createRoom }
