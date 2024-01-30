const express = require("express");
const socket = require("socket.io");

const app = express(); // initialize and server ready the app

app.use(express.static("public"));

let port = 5000;
let server = app.listen(port, () => { // start listening the server
    console.log("Listening to port " + port);
});

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Made socket connection");
    // recieved data
    socket.on("beginPath", (data) => {
        // data -> from frontend
        // transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo",(data)=>{
        io.sockets.emit("redoUndo",data);
    })
})
