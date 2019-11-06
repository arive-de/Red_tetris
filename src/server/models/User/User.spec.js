const User = require('./index')
const expect = require('chai').expect
const { connect, disconnect } = require('../../helpers.spec')

describe('#Model User', function() {
  connect()
  disconnect()
  it('should be invalid if username is empty', function(done) {
    const u = new User()

    u.validate(function(err) {
      expect(err.errors.username).to.exist
      done()
    })
  })

  it('should be valid because username is filled', function(done) {
    const u = new User({ username: 'mama'})

    u.validate(function(err) {
      expect(err).to.be.null
      done()
    })
  })
  
  it("can be saved", function(done) {
    new User({ username: 'test' }).save(done);
  });

  it("can be deleted", function(done) {
    User.deleteOne({ username: 'test' }, done);
  });

})