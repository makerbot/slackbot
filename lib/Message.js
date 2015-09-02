module.exports = Message;

function Message(message, bot) {
  // ignore edits/deletes
  if (message.hidden) {
    this.invalid = true;
    return;
  }
  this.message = message;
  this.bot = bot;
  this.getText();
}

Message.prototype.getText = function() {
  if (this.text) {
    return this.text;
  }

  var text = this.message.text;
  if (typeof text !== 'string' || !text.trim()) {
    this.invalid = true;
    return;
  }
  // do some normalization
  text = text.replace(/\s{2,}/, ' ').trim();
  return this.text = text;
};

Message.prototype.getUser = function(link) {
  var user = this.message.user;
  if (link) {
    return '<@' + user + '>';
  }
  return this.bot.slack.getUserByID(user);
};

Message.prototype.getChannel = function(link) {
  var channel = this.message.channel;
  if (link) {
    return '<#' + channel + '>';
  }
  return this.bot.slack.getChannelGroupOrDMByID(channel);
};

Message.prototype.isDM = function() {
  return this.message.getChannelType() === 'DM';
}

Message.prototype.isGroup = function() {
  return this.message.getChannelType() === 'Group';
}

Message.prototype.isChannel = function() {
  return this.message.getChannelType() === 'Channel';
}

Message.prototype.matchWith = function(match) {
  return this.matches = this.text.match(match);
}
