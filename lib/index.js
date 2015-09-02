var Slack = require('slack-client')
  , log = require('./helpers/log')
  , Registry = require('./Registry')
  , checkToken = require('./helpers/checkToken')
  ;

module.exports = Bot;

function Bot(token) {
  var self = this;

  token = checkToken(token);
  var slack = this.slack = new Slack(token);
  slack.on('loggedIn', function(bot) {
    this.logger.info('Logged in as ' + bot.name + ' on team ' + slack.team.name);
  }).on('message', function(message) {
    self.registry.newMessage(message);
  }).on('error', function(err) {
    this.logger.error(err);
  });

  this.registry = new Registry(this);

  slack.login();
};

Bot.prototype.listen = function listen(match) {
  var listener = this.registry.add(match);
  return listener;
};
