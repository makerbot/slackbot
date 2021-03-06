[![npm version](https://badge.fury.io/js/slackbase.svg)](https://badge.fury.io/js/slackbase)
[![Build status](https://travis-ci.org/makerbot/slackbot.svg?branch=master)](https://travis-ci.org/makerbot/slackbot) 
[![Dependencies](https://david-dm.org/makerbot/slackbot.svg)](https://david-dm.org/makerbot/slackbot)

### Usage by example

```sh
npm install --save slackbase
```


```js
const Bot = require('slackbase')
  , bot = new Bot('SLACK-TOKEN-HERE')
  ;

bot.listen(/good night/).permit(message => {
  // only reply if after 17:00 and message is a DM
  const now = new Date();
  return message.isDM() && now.getHours() >= 17;
}).action(message => {
  const user = message.getUser();
  const channel = message.getChannel();
  channel.send(`sleep tight, ${user.name}`);
});
```

### Running tests
```sh
git clone https://github.com/makerbot/slackbot.git
cd slackbot
npm install
npm test
```
Can also see status on https://travis-ci.org/makerbot/slackbot

### FAQ
*Why is the NPM package titled `slackbase` but the repo `slackbot`?*

Well, every variation of `slackbot` is already claimed on NPM, but `slackbot` makes the most sense for what this project is.
