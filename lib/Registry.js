var Listener = require('./Listener')
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
  if (!message.text || !message.text.trim()) {
    return;
  }
  _.forEach(_.filter(this.listeners, 'active'), function(listener) {
    listener.checkMessage(message);
  });
};
