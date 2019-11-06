const Room = require('./index')
const expect = require('chai').expect
const { connect, disconnect } = require('../../helpers.spec')

describe('#Model Room', function() {
  connect()
  disconnect()
  it('should be invalid if roomId or type or running are missing', function(done) {
    const r = new Room()

    r.validate(function(err) {
      expect(err.errors.running).to.exist
      expect(err.errors.roomId).to.exist
      expect(err.errors.type).to.exist
      done()
    })
  })

  it('should be valid because roomId and type and running are filled', function(done) {
    const r = new Room({ roomId: 'mama', type: 'Classic', running: false })

    r.validate(function(err) {
      expect(err).to.be.null
      done()
    })
  })

  it("can be saved", function(done) {
    new Room({ roomId: 'mama', type: 'Classic', running: false }).save(done);
  });

  it("can be deleted", function(done) {
    Room.deleteOne({ roomId: 'mama', type: 'Classic', running: false }, done);
  });

})