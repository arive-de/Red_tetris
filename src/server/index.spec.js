const expect = require('chai').expect
const { create } = require('./index')

describe('#first test', function() {
  it('with 42', function(done) {
    expect(42).to.be.a('number')
    expect('42').to.be.a('string')
    done()
  })
})