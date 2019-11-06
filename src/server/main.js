const server = require('./index')

server.create()
.then(() => {
  console.log('server and Db are UP ^^')
})
.catch(() => {
  console.log('server caught an error')
})