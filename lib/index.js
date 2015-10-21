'use strict';

const Slack = require('slack-client')
  , Registry = require('./Registry')
  , checkToken = require('./helpers/checkToken')
  ;

class Bot {
  constructor(token) {
    token = checkToken(token);
    const slack = this.slack = new Slack(token);
    slack.on('loggedIn', bot => {
      console.log(`Logged in as ${bot.name} on team ${slack.team.name}`);
    }).on('message', message => {
      this.registry.newMessage(message);
    }).on('error', err => {
      console.error(err);
    });

    this.registry = new Registry(this);
    this.locals = {};

    slack.login();
  }

  listen(match) {
    const listener = this.registry.add(match);
    return listener;
  }
}

module.exports = Bot;
