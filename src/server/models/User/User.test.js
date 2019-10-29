const mongoose = require('mongoose')
const User = require('./index.js')
const expect = require('chai').expect

describe('#User', function() {
  it('should be invalid if username is empty', function(done) {
    const u = new User()

    u.validate(function(err) {
      expect(err.errors.username).to.exist
      done()
    })
  })
})