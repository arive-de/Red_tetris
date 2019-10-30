import * as server from './index'

server.create().then(() => {
  console.log('server and Db are UP ^^')
}).catch(() => {
  console.log('err server')
})