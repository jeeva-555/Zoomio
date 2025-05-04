const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let Rooms = {}; 

io.on("connection", socket => {
    socket.emit("myid", socket.id);

    socket.on("NewUser", ({ PeerId, SocketId, UserName, roomid }) => {
        socket.join(roomid);

        const newUser = { peerid: PeerId, socketid: SocketId, username: UserName };

        if (!Rooms[roomid]) Rooms[roomid] = [];

        const alreadyExists = Rooms[roomid].some(user => user.username === UserName);
        if (!alreadyExists) Rooms[roomid].push(newUser);

        io.to(roomid).emit("Updateusers", Rooms[roomid]);
    });


    socket.on("caller",data=>{
        io.to(data.to).emit("caller-info",data)
    });

    socket.on("call-rejected",data=>{
        io.to(data.to).emit("callee-reject",data.from)
    });

    socket.on("message",(data)=>{
        io.to(data.roomid).emit("messages",data);
    })

    

    socket.on("disconnect", () => {
        for (const room in Rooms) {
            Rooms[room] = Rooms[room].filter(user => user.socketid !== socket.id);
            io.to(room).emit("Updateusers", Rooms[room]);
        }
    });
});

server.listen(8008, () => {
    console.log("Server is running on port 8008");
});
