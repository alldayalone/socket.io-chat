const chalk = require('chalk');

// 24-hours format "03:00:00"
function time() {
  return chalk.gray(new Date().toLocaleTimeString('en-GB'));
}

function userChalk(user, message) {
  return time() + ' ' + chalk.keyword(user.color)(`${user.emoji}  ${user.name}:`) + ' ' + message;
}

function systemChalk(message) {
  return time() + ' ' + chalk.italic.cyan(message);
}

module.exports = {
  time,
  userChalk,
  systemChalk,
}