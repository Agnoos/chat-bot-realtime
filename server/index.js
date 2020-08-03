const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users.js')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


io.on('connect', (socket) =>{
    socket.on('join', ({name, room}, callback) =>{
        const { error, user} = addUser({ id: socket.id, name, room })

        if(error) return callback(error)

        socket.emit('message', { user: 'admin', text: `${user.name}, Bem vindo a sala ${user.room}`})
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, entrou!`})

        socket.join(user.room)

        callback()

        // const delicia = true 

        // // if(error) {
        // //     callback({error : 'error'})
        // // }
        // callback({delicia : delicia})

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        
    })



    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    
        callback();
      });
    socket.on('disconnect', () =>{

        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} acaba de Sair.`})
        }
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port  ${PORT}`))