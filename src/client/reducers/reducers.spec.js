import reducer from '../reducers'
import { actSetUsername, actSetTypeGame, actSetSocket, actGetUsers, actAddUser, actLogout, actGetHighscores } from '../actions/user'
import { actGetRooms, actCreateRoom, actJoinRoom, actLeaveRoom, actPlayGame, actStopGame } from '../actions/room'

describe('user reducer', () => {
  let input
  let expectedOutput
  let action

  it ('SET_USERNAME', () => {
    action = actSetUsername('tester')
    input = { username: null }
    expectedOutput = { username: 'tester' }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })
  
  it ('SET_TYPEGAME', () => {
    action = actSetTypeGame(true)
    input = { typeGame: false }
    expectedOutput = { typeGame: true }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it ('SET_SOCKET', () => {
    action = actSetSocket('socket')
    input = { socket: null }
    expectedOutput = { socket: 'socket' }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it ('GET_USERS', () => {
    action = actGetUsers(['user1', 'user2', 'user3'])
    input = { username: 'user0' }
    expectedOutput = { username: 'user0', userList: ['user1', 'user2', 'user3'] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it ('ADD_USER', () => {
    action = actAddUser('newUser')
    input = { username: 'user0', userList: ['user1', 'user2', 'user3'] }
    expectedOutput = { username: 'user0', userList: ['user1', 'user2', 'user3', 'newUser'] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it ('LOGOUT', () => {
    action = actLogout({ username: 'outUser', roomId: 'test' })
    input = { username: 'user0', userList: ['user1', 'user2', 'outUser', 'user3'], rooms: [{ roomId: 'test', players: ['joe', 'outUser'] }] }
    expectedOutput = { username: 'user0', userList: ['user1', 'user2', 'user3'], rooms: [{ roomId: 'test', players: ['joe'] }] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it ('LOGOUT 2', () => {
    action = actLogout({ username: 'outUser', roomId: 'test' })
    input = { username: 'user0', userList: ['user1', 'user2', 'outUser', 'user3'], rooms: [{ roomId: 'test', players: ['outUser'] }] }
    expectedOutput = { username: 'user0', userList: ['user1', 'user2', 'user3'], rooms: [] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it ('GET_HIGHSCORES', () => {
    action = actGetHighscores([{ username: 'user1', score: 3 }, { username: 'user2', score: 42 }, { username: 'user3', score: 4200 }])
    input = { username: 'user0', highscores: [] }
    expectedOutput = { username: 'user0', highscores: [{ username: 'user1', score: 3 }, { username: 'user2', score: 42 }, { username: 'user3', score: 4200 }] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })
})

describe('room reducer', () => {
  let input
  let expectedOutput
  let action

  it('GET_ROOMS', () => {
    action = actGetRooms([{ roomId: 'someRoom' }, { roomId: 'test', type: 'Classic', players: ['tester'], running: false }])
    input = { username: 'tester', rooms: [{ roomId: 'otherRoom' }] }
    expectedOutput = { username: 'tester', rooms: [{ roomId: 'someRoom' }, { roomId: 'test', type: 'Classic', players: ['tester'], running: false }] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it('CREATE_ROOM', () => {
    action = actCreateRoom({ roomId: 'test', type: 'Classic', players: ['tester'], running: false })
    input = { username: 'tester', rooms: [{ roomId: 'someRoom' }] }
    expectedOutput = { username: 'tester', roomId: 'test', rooms: [{ roomId: 'someRoom' }, { roomId: 'test', type: 'Classic', players: ['tester'], running: false }] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it('JOIN_ROOM', () => {
    action = actJoinRoom({ roomId: 'test', username: 'newPlayer' })
    input = { username: 'tester', roomId: null, rooms: [{ roomId: 'someRoom' }, { roomId: 'test', type: 'Classic', players: ['john'], running: false }] }
    expectedOutput = { username: 'tester', roomId: null, rooms: [{ roomId: 'someRoom' }, { roomId: 'test', type: 'Classic', players: ['john', 'newPlayer'], running: false }] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it('LEAVE_ROOM', () => {
    action = actLeaveRoom({ roomId: 'test', username: 'john' })
    input = { username: 'tester', isPlaying: false, roomId: null, rooms: [{ roomId: 'someRoom', players: ['michel'] }, { roomId: 'test', type: 'Classic', players: ['john', 'newPlayer'], running: false, leaderBoard: [0, 0] }] }
    expectedOutput = { username: 'tester', isPlaying: false, roomId: null, rooms: [{ roomId: 'someRoom', players: ['michel'] }, { roomId: 'test', type: 'Classic', players: ['newPlayer'], running: false, leaderBoard: [0] }] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it('PLAY_GAME', () => {
    action = actPlayGame('test')
    input = { username: 'tester', isPlaying: false, roomId: 'test', rooms: [{ roomId: 'someRoom', players: ['michel'] }, { roomId: 'test', type: 'Classic', players: ['tester', 'john', 'newPlayer'], running: false, leaderBoard: [0, 0, 0] }] }
    expectedOutput = { username: 'tester', isPlaying: true, roomId: 'test', rooms: [{ roomId: 'someRoom', players: ['michel'] }, { roomId: 'test', type: 'Classic', players: ['tester', 'john', 'newPlayer'], running: true, leaderBoard: [0, 0, 0] }] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })

  it('STOP_GAME', () => {
    action = actStopGame('test')
    input = { username: 'tester', isPlaying: true, roomId: 'test', rooms: [{ roomId: 'someRoom', players: ['michel'] }, { roomId: 'test', type: 'Classic', players: ['tester', 'john', 'newPlayer'], running: true, leaderBoard: [0, 0, 0] }] }
    expectedOutput = { username: 'tester', isPlaying: false, roomId: 'test', rooms: [{ roomId: 'someRoom', players: ['michel'] }, { roomId: 'test', type: 'Classic', players: ['tester', 'john', 'newPlayer'], running: true, leaderBoard: [0, 0, 0] }] }
    expect(reducer(input, action)).to.deep.equal(expectedOutput)
  })
})