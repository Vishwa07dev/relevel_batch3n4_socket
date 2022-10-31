const express = require("express");
const app = express();
const http = require('http').Server(app);
const socket = require("socket.io");
const io = socket(http);


/**
 * Event when the client tries to connect to the
 * server
 */
io.on('connection', (socket)=>{
   console.log("one client connected");

   socket.on("clientEvent", (data)=>{
       console.log(data);
   })

   //When the client is closed
   socket.on('disconnect', ()=>{
       console.log("One client disconnected");
   })
})


/**
 * Rendering html
 */
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

http.listen(8888,()=>{
    console.log("Application started");
})