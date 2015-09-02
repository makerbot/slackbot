var Listener = require('./Listener')
  , Message = require('./Message')
  , shortid = require('shortid')
  , _ = require('lodash')
  ;

module.exports = Registry;

function Registry(bot) {
  this.bot = bot;
  this.listeners = {};
};

Registry.prototype.add = function add(match) {
  var listener = new Listener(match);
  var id = shortid.generate();
  listener.id = id;
  listener.active = true;
  this.listeners[id] = listener;
  return listener;
};

Registry.prototype.reactivate = function reactivate(id) {
  if (this.listeners[id] instanceof Listener) {
    this.listeners[id].active = true;
    return this.listeners[id];
  }
};

Registry.prototype.deactivate = function deactivate(id) {
  if (this.listeners[id] instanceof Listener) {
    this.listeners[id].active = false;
    return this.listeners[id];
  }
};

Registry.prototype.newMessage = function newMessage(message) {
  message = new Message(message, this.bot);
  if (message.invalid) {
    return;
  }
  _.forEach(_.filter(this.listeners, 'active'), function(listener) {
    if (listener.checkMessage(message)) {
      return false; // stop on first match
    }
  });
};
