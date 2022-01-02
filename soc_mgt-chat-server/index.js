
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:8000',
        methods: ['*'],
    }
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`${socket.id} room ${data}`);
    })

    socket.on("send_message", (data) => {
        // console.log(`${data.author}`);
        socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
})

server.listen(3005, () => {
    console.log("server running!");
}) 