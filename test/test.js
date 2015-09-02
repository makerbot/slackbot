process.env.NODE_ENV = 'test';
process.env.SLACK_LOG_LEVEL = 'warning';

var should = require('chai').should()
  , Bot = require('../lib')
  , checkToken = require('../lib/helpers/checkToken')
  , shortid = require('shortid')
  ;

describe('Bot', function () {
  it('calling new Bot() with token', function() {
    var bot = new Bot('effewfw');
    bot.should.be.an.instanceOf(Bot);
  });

  it('calling new Bot() without token', function() {
    (function() {
      new Bot();
    }).should.Throw(TypeError);
  });
});

describe('checkToken', function () {
  it('string should return itself', function() {
    var string = shortid.generate();
    checkToken(string).should.equal(string);
  });

  it('non-string should throw', function() {
    (function() {
      checkToken(5)
    }).should.Throw(TypeError);
  });
});
