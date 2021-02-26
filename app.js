const express = require('express');
const path = require('path');
const http = require('http');
const hbs = require('hbs');

const { obj } = require('./public/utils/object.js');


const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirectory = path.join(__dirname+"/public");
app.use(express.static(publicDirectory));

var count = parseInt(0); 

io.on('connection',(socket)=>{

    socket.on('join',({ username },cb)=>{

        socket.broadcast.emit('newLogin',obj(username));

        count = count+1;
        io.emit('updateCount',count);
        
        cb();

    })

    socket.on('gotCorrectAnswer',()=>{
        io.emit('updateLeaderBoard');
    })
    
    
    socket.on('disconnect',()=>{

        count = count-1;
        socket.broadcast.emit('updateCount',count);
        
    })
})


const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log('Server started successfully at port : '+port);
})