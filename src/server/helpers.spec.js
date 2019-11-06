const debug = require('debug')('∆:helper spec')
const mongoose = require('mongoose')

const connect = () => {
  before(function(done) {
    mongoose.connect('mongodb://localhost:27017/redtetris', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', function() {
      debug('DB connection [OK]')
      done()
    })
  })
}

const disconnect = () => {
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close()
      debug('DB disconnection [OK]')
      done()
    })
  })
}

module.exports = { connect, disconnect }
