var log = require('./helpers/log.js');

module.exports = Listener;

function Listener(match) {
  if (typeof match !== 'string' && !(match instanceof RegExp)) {
    log.error('match must be a string or RegExp');
    return;
  }
  this.match = match;
  this.permitFn = null;
};

Listener.prototype.permit = function permit(func) {
  if (typeof func === 'function') {
    this.permitFn = func;
    return this;
  }
  log.error('permit callback must be a function');
};

Listener.prototype.action = function action(func) {
  if (typeof func === 'function') {
    this.actionFn = func;
    return this;
  }
  log.error('action callback must be a function');
};

Listener.prototype.checkMessage = function checkMessage(message) {
  if (!message.matchWith(this.match)) {
    return false;
  }
  if (this.permitFn !== null && !this.permitFn(message)) {
    return false;
  }
  this.actionFn(message);
  return true;
};
