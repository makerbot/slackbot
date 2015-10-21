module.exports = token => {
  if (typeof token === 'string') {
    return token;
  }

  throw new TypeError('No Slack token; provide in Bot constructor');
};
