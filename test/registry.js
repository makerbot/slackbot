'use strict';

const chai = require('chai')
  , should = chai.should()
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , Bot = require('../lib')
  , Registry = require('../lib/Registry')
  , Listener = require('../lib/Listener')
  ;

chai.use(sinonChai);

describe('Registry', () => {

  it('Creating a new instance', () => {
    const r = new Registry();
    r.should.be.an.instanceOf(Registry)
      .and.have.ownProperty('bot')
      .and.have.property('listeners')
        .which.is.an('object')
        .and.is.empty;
  });

  it('add() adds a listener', () => {
    const r = new Registry();
    const listener = r.add(' ');
    listener.should.be.an.instanceOf(Listener);
    listener.should.have.ownProperty('id')
      .and.have.property('active', true);
    r.listeners.should.have.property(listener.id, listener);
  });

  it('deactivate() disables a listener', () => {
    const r = new Registry();
    const listener = r.add(' ');
    const id = listener.id;
    r.deactivate(id);
    r.listeners[id].active.should.be.false;
  });

  it('reactivate() re-enables a listener', () => {
    const r = new Registry();
    const id = r.add(' ').id;
    r.deactivate(id);
    r.reactivate(id);
    r.listeners[id].active.should.be.true;
  });

  it('newMessage tries listeners for match', () => {
    const r = new Registry();
    const listener = r.add(' ');
    const spy = sinon.spy(listener, 'checkMessage');
    r.newMessage({
      text: 'Rich Purnell is a steely-eyed missile man.',
    });
    spy.should.have.been.calledOnce;
  });
});
