const readline = require('readline');
const faker = require('faker');
const socket = require("socket.io-client")('http://localhost:3000');
const { systemChalk } = require('./utils');

const user = {
  name: faker.name.findName(),
  color: faker.commerce.color(),
  emoji: String.fromCodePoint(faker.datatype.number({ min: "😀".codePointAt(0), max: "🙄".codePointAt(0) })),
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const log = message => {
  readline.cursorTo(process.stdout, 0);
  console.log(message);
  rl.prompt();
}

socket.on("connect", () => {
  log(systemChalk(`✔️  Connected to socket ${socket.id}`));  
  socket.emit('login', user);
});

socket.on('message', message => {
  log(message);
});
  
socket.on("disconnect", (reason) => {
  log(systemChalk(`❌  Connection dropped (${reason})`));
});

rl.on('line', (line) => {
  socket.emit('message', line);

  // Clear user input
  readline.moveCursor(process.stdout, 0, -1);
  readline.clearLine(process.stdout, 0);    
  rl.prompt();
});

rl.prompt();
