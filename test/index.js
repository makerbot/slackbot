'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.SLACK_LOG_LEVEL = process.env.SLACK_LOG_LEVEL || 'warning';

const chai = require('chai')
  , should = chai.should()
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , Bot = require('../lib')
  , checkToken = require('../lib/helpers/checkToken')
  ;

chai.use(sinonChai);

describe('Bot', () => {
  it('calling new Bot() with token', () => {
    const bot = new Bot('effewfw');
    bot.should.be.an.instanceOf(Bot);
  });

  it('calling new Bot() without token', () => {
    (() => { new Bot() }).should.throw(TypeError);
  });
});

describe('checkToken', () => {
  it('string should return itself', () => {
    const string = 'Potatoes on Mars.';
    checkToken(string).should.equal(string);
  });

  it('non-string should throw', () => {
    (() => { checkToken(5) }).should.throw(TypeError);
  });
});
