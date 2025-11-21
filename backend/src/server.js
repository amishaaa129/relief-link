const http = require('http');
const app = require('./app');
const { connect } = require('./db/mongo');
const { port } = require('./config');
const { initRealtime } = require('./sockets/realtime');


const server = http.createServer(app);
const io = initRealtime(server);

module.exports.io = io;

async function start() {
try {
await connect();
server.listen(port, () => {
console.log(`Server listening on port ${port}`);
});
} catch (err) {
console.error('Failed to start', err);
process.exit(1);
}
}


start();