'use strict';

const Listener = require('./Listener')
  , Message = require('./Message')
  , _ = require('lodash')
  ;

class Registry {
  constructor(bot) {
    this.bot = bot;
    this.listeners = {};
  }

  add(match) {
    const listener = new Listener(match);
    const id = _.uniqueId();
    listener.id = id;
    listener.active = true;
    this.listeners[id] = listener;
    return listener;
  }

  reactivate(id) {
    if (this.listeners[id] instanceof Listener) {
      this.listeners[id].active = true;
      return this.listeners[id];
    }
  }

  deactivate(id) {
    if (this.listeners[id] instanceof Listener) {
      this.listeners[id].active = false;
      return this.listeners[id];
    }
  }

  newMessage(message) {
    message = new Message(message, this.bot);
    if (message.invalid) {
      return;
    }
    _.forEach(_.filter(this.listeners, 'active'), listener => {
      if (listener.checkMessage(message)) {
        return false; // stop on first match
      }
    });
  }
}

module.exports = Registry;
