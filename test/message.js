'use strict';

const chai = require('chai')
  , should = chai.should()
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , Message = require('../lib/Message')
  , noop = function(){}
  ;

chai.use(sinonChai);

describe('Message', () => {
  const message = {
    type: 'message',
    channel: 'CHANNEL',
    user: 'USER',
    text: 'Rich Purnell is a steely-eyed missile man.',
    ts: 'TIMESTAMP',
    team: 'TEAM',
    getChannelType: function() { return 'DM' },
  };

  const bot = {
    slack: {
      getUserByID: noop,
      getChannelGroupOrDMByID: noop,
    }
  };

  it('Creating a new instance', () => {
    const msg = new Message(message, {});
    msg.should.be.an.instanceOf(Message)
      .and.have.ownProperty('message')
      .and.have.ownProperty('bot')
      .and.have.ownProperty('text')
      .and.not.have.ownProperty('invalid');
  });

  it('Creating a new instance w/ "hidden" message fails', () => {
    const m = Object.assign({}, { hidden: true }, message);
    const msg = new Message(m);
    msg.should.have.ownProperty('invalid', true)
      .and.not.have.ownProperty('bot')
      .and.not.have.ownProperty('text');
  });

  it('getText works', () => {
    const text = 'Bring Him Home';
    const msg = new Message({ text });
    msg.getText().should.eq(text);
    msg.text.should.eq(text);
  });

  it('getText normalizes', () => {
    const text = '  Bring  Him  Home     ';
    const msg = new Message({ text });
    msg.getText().should.eq('Bring Him Home');
  });

  it('getText w/ non-string invalidates', () => {
    const msg = new Message({ text: false });
    msg.should.have.ownProperty('invalid', true)
      .and.not.have.ownProperty('text');
  });

  it('getUser works', () => {
    const spy = sinon.spy(bot.slack, 'getUserByID');
    const msg = new Message(message, bot);
    msg.getUser();
    spy.should.have.been.calledOnce;
  });

  it('getUser(true) works', () => {
    const msg = new Message(message, {});
    msg.getUser(true).should.eq(`<@${message.user}>`);
  });

  it('getChannel works', () => {
    const spy = sinon.spy(bot.slack, 'getChannelGroupOrDMByID');
    const msg = new Message(message, bot);
    msg.getChannel();
    spy.should.have.been.calledOnce;
  });

  it('getChannel(true) works', () => {
    const msg = new Message(message, {});
    msg.getChannel(true).should.eq(`<#${message.channel}>`);
  });

  it('isDM works', () => {
    const msg = new Message(message);
    msg.isDM().should.be.true;
  });

  it('isGroup works', () => {
    const msg = new Message(message);
    msg.isGroup().should.be.false;
  });

  it('isChannel works', () => {
    const msg = new Message(message);
    msg.isChannel().should.be.false;
  });

  it('matchWith works', () => {
    const msg = new Message(message);
    msg.matchWith(/missile man/).should.be.an('array');
    msg.matches.should.be.an('array');
  });
});
