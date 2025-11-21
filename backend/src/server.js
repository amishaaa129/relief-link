require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connect } = require("./db/mongo");
const { port } = require("./config");
const { initRealtime } = require("./sockets/realtime");

async function start() {
  try {
    await connect();

    const server = http.createServer(app);
    const io = initRealtime(server);
    module.exports.io = io;

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    process.on("SIGINT", () => {
      server.close(() => {
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}

start();
