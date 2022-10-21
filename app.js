const express = require("express");
const app = express();
const http = require('http').Server(app);
const socket = require("socket.io");
const io = socket(http);




/**
 * Rendering html
 */
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

http.listen(8888,()=>{
    console.log("Application started");
})