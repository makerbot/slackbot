'use strict';

class Message {
  constructor(message, bot) {
    // ignore edits/deletes
    if (message.hidden) {
      this.invalid = true;
      return;
    }
    this.message = message;
    this.bot = bot;
    this.getText();
  }

  getText() {
    if (this.text) {
      return this.text;
    }

    let text = this.message.text;
    if (typeof text !== 'string' || !text.trim()) {
      this.invalid = true;
      return;
    }
    // do some normalization
    text = text.replace(/\s{2,}/g, ' ').trim();
    return this.text = text;
  }

  getUser(link) {
    const user = this.message.user;
    if (link) {
      return '<@' + user + '>';
    }
    return this.bot.slack.getUserByID(user);
  }

  getChannel(link) {
    const channel = this.message.channel;
    if (link) {
      return '<#' + channel + '>';
    }
    return this.bot.slack.getChannelGroupOrDMByID(channel);
  }

  isDM() {
    return this.message.getChannelType() === 'DM';
  }

  isGroup() {
    return this.message.getChannelType() === 'Group';
  }

  isChannel() {
    return this.message.getChannelType() === 'Channel';
  }

  matchWith(match) {
    return this.matches = this.text.match(match);
  }
}

module.exports = Message;
