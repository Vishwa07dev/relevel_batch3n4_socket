const express = require("express");
const app = express();
const http = require('http').Server(app);
const socket = require("socket.io");
const io = socket(http);


/**
 * Event when the client tries to connect to the
 * server
 */

let clientCount = 0;
io.on('connection', (socket)=>{
   console.log("one client connected");
   clientCount++;

   /**
    * Broadcast the messages to all the client
    */
   io.sockets.emit('broadcast', {description : "clients connected = "+ clientCount})
   //When the client is closed
   socket.on('disconnect', ()=>{
       console.log("One client disconnected");
       clientCount--;
       io.sockets.emit('broadcast', {description : "clients connected = "+ clientCount})

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