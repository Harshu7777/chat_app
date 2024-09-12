const http = require("http");
const express = require('express');
const path = require("path");
const app = express();
const PORT = 5000;

const server = http.createServer(app);

// Initialize Socket.IO
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

io.on("connection", (socket) => {
    socket.on("user-message", (message) => {
        io.emit("message", message); // Broadcast the message to all clients
    });
});


app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

server.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
