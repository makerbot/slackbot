'use strict';

const chai = require('chai')
  , should = chai.should()
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , Listener = require('../lib/Listener')
  , Message = require('../lib/Message')
  , noop = function(){}
  ;

chai.use(sinonChai);

describe('Listener', () => {
  let listener;

  beforeEach(() => {
    listener = new Listener('Mars');
  });

  it('Creating a new instance', () => {
    listener.should.be.an.instanceOf(Listener)
      .and.have.ownProperty('match')
      .and.have.ownProperty('permitFn')
      .and.have.ownProperty('actionFn')
  });

  it('Creating new instance fails when passed boolean', () => {
    (() => { new Listener(true) }).should.throw(TypeError);
  });

  it('permit() adds permission function', () => {
    listener.permit(noop).should.eq(listener);
    listener.permitFn.should.eq(noop);
  });

  it('permit(true) throws TypeError', () => {
    (() => { listener.permit(true) }).should.throw(TypeError);
  });

  it('action() adds action function', () => {
    listener.action(noop).should.eq(listener);
    listener.actionFn.should.eq(noop);
  });

  it('action(true) throws TypeError', () => {
    (() => { listener.action(true) }).should.throw(TypeError);
  });

  it('checkMessage() works', () => {
    const earth = new Message({ text: 'Earth' });
    const mars = new Message({ text: 'Mars' });
    const spy = sinon.spy(mars, 'matchWith');

    // no match
    listener.checkMessage(earth).should.be.false;
    // no action
    listener.checkMessage(mars).should.be.false;
    spy.should.have.been.calledOnce;
    // permit always fails
    listener.permit(() => false).checkMessage(mars).should.be.false;
    // matches, permitted, has action
    listener.permit(() => true)
      .action(() => true)
      .checkMessage(mars).should.be.true;
  });

});
