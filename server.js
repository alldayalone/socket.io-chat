const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
const { userChalk, systemChalk } = require('./utils');

io.on("connection", (socket) => {
  const user = { id: socket.id };
  console.log(`📌  New connection ${socket.id}`);

  socket.on("disconnect", (reason) => {
    console.log(`❌  Connection dropped (${reason}) ${socket.id}`);
    io.emit("message", systemChalk(`${user.name} left`));
  });

  socket.on('message', message => {
    console.log(`[${socket.id}][message] ${user.name}: ${message}`);
    io.emit("message", userChalk(user, message));
  });

  socket.on('login', data => {
    Object.assign(user, data);
    console.log(`[${socket.id}][login] 👋  Hello, ${user.name}`);
    io.emit("message", systemChalk(`${user.name} entered the room`));
  });
});

httpServer.listen(3000, () => {
  console.log('🚀  Server has started on port 3000!');
});