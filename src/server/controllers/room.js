const Room = require('../models/Room');

let i = 0

const createRoom = (username, cb) => {

  i = i + 1

  const newRoom = new Room({
    players: [username],
    roomId: 'xx' + i.toString(),
    type: 'Classic',
    running: false,
  })

  newRoom.save()
    .then(data => {
      console.log(data)
      console.log(`new room added by ${username} to db`)
      cb(data)
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
