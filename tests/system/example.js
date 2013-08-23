var expect = require('chai').expect,
    webdriverjs = require("webdriverjs");

describe('Test tests', function(){

  var client = {};

  before(function(){
    client = webdriverjs.remote();
    client.init();
  });

  it('has some stuff that should be correct',function(done) {
    client
        .url('http://localhost:8000')
        .getTitle(function(err, title) {
          expect(err).to.be.null;
          expect(title).to.equal('My Title');
        })
        .call(done);
  });

  after(function(done) {
    client.end(done);
  });
});