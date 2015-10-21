'use strict';

class Listener {
  constructor(match) {
    if (typeof match !== 'string' && !(match instanceof RegExp)) {
      throw new TypeError('match must be a string or RegExp');
    }
    this.match = match;
    this.permitFn = null;
    this.actionFn = null;
  }

  permit(func) {
    if (typeof func !== 'function') {
      throw new TypeError('permit callback must be a function');
    }
    this.permitFn = func;
    return this;
  }

  action(func) {
    if (typeof func !== 'function') {
      throw new TypeError('action callback must be a function');
    }
    this.actionFn = func;
    return this;
  }

  checkMessage(message) {
    if (!message.matchWith(this.match)) {
      return false;
    }
    if (this.permitFn !== null && !this.permitFn(message)) {
      return false;
    }
    if (this.actionFn === null) {
      return false;
    }
    this.actionFn(message);
    return true;
  }
}

module.exports = Listener;
