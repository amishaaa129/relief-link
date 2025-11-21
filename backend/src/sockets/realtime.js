const { Server } = require("socket.io");

let io;

function initRealtime(server) {
  io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", socket => {
    socket.on("new-need", data => {
      io.emit("need-updated", data);
    });

    socket.on("new-user", data => {
      io.emit("user-updated", data);
    });
  });

  return io;
}

function getIO() {
  return io;
}

module.exports = { initRealtime, getIO };
