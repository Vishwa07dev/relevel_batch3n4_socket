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
   socket.emit('newclientconnect', {description : `
    <form action="chatPage.html">
    <label for="name">Name: </label>
    <input type="text" id="name" name="name"><br><br>
    <input type="submit" value="Submit">
    </form>
`});
   
   // For broadcasting to every other client
   socket.broadcast.emit('joined', {description : "New client joined. <br> Clients count :"+clientCount});
   //When the client is closed
   socket.on('disconnect', ()=>{
       console.log("One client disconnected");
       clientCount--;
       io.sockets.emit('newclientconnect', {description : "Clients count :"+clientCount})

   })
})


/**
 * Rendering html
 */
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.get("/chatPage.html", (req, res)=>{
    res.sendFile(__dirname + "/chatPage.html");
})

http.listen(8888,()=>{
    console.log("Application started");
})