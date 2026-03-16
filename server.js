const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

let users = {}

io.on("connection",(socket)=>{

socket.on("join",(username)=>{

users[socket.id] = username

// notify everyone
io.emit("user joined", username + " joined the chat")

// update user list
io.emit("user list", Object.values(users))

})

socket.on("chat message",(data)=>{
io.emit("chat message", data)
})

socket.on("disconnect",()=>{

let username = users[socket.id]

if(username){
io.emit("user left", username + " left the chat")
}

delete users[socket.id]

// update user list
io.emit("user list", Object.values(users))

})

})

server.listen(3000,()=>{
console.log("Server running on port 3000")
})