const App = require("./App");
const http = require("http");
const { initializeSocket } = require("./Util/socket");

const PORT = process.env.PORT || 5000; // ✅ CRITICAL FIX: Added fallback port

// Create HTTP server
const server = http.createServer(App);

// Initialize Socket.io
initializeSocket(server);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server initialized`);
});