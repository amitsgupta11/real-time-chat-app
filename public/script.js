const socket = io()

// Ask username once
let username = prompt("Enter your name")

// Send username to server
socket.emit("join", username)

// Send message
function sendMessage(){

let input = document.getElementById("messageInput")

let message = input.value

if(message === "") return

socket.emit("chat message",{
username:username,
message:message
})

input.value=""

}

// Receive messages
socket.on("chat message",(data)=>{

let li = document.createElement("li")

if(data.username === username){
li.classList.add("my-message")
}else{
li.classList.add("other-message")
}

li.textContent = data.message

document.getElementById("messages").appendChild(li)

})

// Typing indicator
let input = document.getElementById("messageInput")

input.addEventListener("input",()=>{
socket.emit("typing", username)
})

socket.on("typing",(name)=>{

let typing = document.getElementById("typing")

typing.innerText = name + " is typing..."

setTimeout(()=>{
typing.innerText=""
},1000)

})

// Show online users
socket.on("user list",(users)=>{

let list = document.getElementById("users")

list.innerHTML=""

users.forEach(user=>{

let li = document.createElement("li")

li.textContent = user

list.appendChild(li)

})

})

// user joined notification
socket.on("user joined",(msg)=>{

let li = document.createElement("li")

li.textContent = msg
li.classList.add("system-message")

document.getElementById("messages").appendChild(li)

})

// user left notification
socket.on("user left",(msg)=>{

let li = document.createElement("li")

li.textContent = msg
li.classList.add("system-message")

document.getElementById("messages").appendChild(li)

})

