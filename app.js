const express = require("express");
const app = express();
const http = require('http').Server(app);
const socket = require("socket.io");
const io = socket(http);


/**
 * Event when the client tries to connect to the
 * server
 */

const users = [] ;
io.on('connection', (socket)=>{

    socket.on('setUserName', (userName)=>{
        console.log("Set User Name request " + userName);
       //Write the logic to validate if the userName alread picked
       if(users.indexOf(userName) < 0){
           console.log('user name doesnot exist');
           //userName is new
           users.push(userName);
           socket.emit('userAllowed', {
               username : userName
           });
       }else{
        console.log('user name already exist');
           socket.emit('userExists' , 'username already exists ! Try something new');
       }
    });

    socket.on('msg', (data)=>{
        io.sockets.emit('newMessage', data);
    });
   
    socket.on('disconnect', ()=>{
      
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