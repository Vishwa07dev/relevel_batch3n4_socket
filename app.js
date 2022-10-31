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
    * Broadcast the messages to all the clients except this one
    */

   // For the client which is getting connected
   socket.emit('newclientconnect', {description : "Hey Welcome !"});
   
   // For broadcasting to every other client
   socket.broadcast.emit('newclientconnect', {description : "Cients count :"+clientCount});
   //When the client is closed
   socket.on('disconnect', ()=>{
       console.log("One client disconnected");
       clientCount--;
       io.sockets.emit('newclientconnect', {description : "clients connected = "+ clientCount})

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