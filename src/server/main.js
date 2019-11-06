import * as server from './index'

server.create()
.then(({ stop }) => {
  console.log('server and Db are UP ^^')
  // stop(() => {
  //   console.log('app closing')
  // })
})
.catch(() => {
  console.log('server caught an error')
})
