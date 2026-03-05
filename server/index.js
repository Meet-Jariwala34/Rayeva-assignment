const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');
const loginRoute = require('./routes/login.route');
const cors = require('cors');
const aiRoute = require('./routes/ai.route');
const orderRoute = require('./routes/order.route');
const chatsRoute = require('./routes/chat.route')
const fetchUser = require('./routes/user.route');
const authenticate = require('./routes/verify.route');
const http = require('http');
const {Server} = require('socket.io');

//creating the server
const server = http.createServer(app)
const io = new Server(server,{
    cors : {
        origin : "https://rayeva-assignment.vercel.app"
    }
});

//Easy to access anywhere 
app.set('socketio',io);

//Listening Server
server.listen(PORT , () => {
    console.log(`Server is running on the port ${PORT}`)
})

// Connect to the database
connectDB();

//server connection
io.on("connection",(socket)=>{
    console.log("User is connected with id : ", socket.id)

    //When admin logged-in
    socket.on("admin-join",()=>{
        console.log("Admin is joined")
        socket.join("admin-room");
    })
})

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/verify",authenticate);
app.use("/api", loginRoute);
app.use("/ai",aiRoute);
app.use("/order/api",orderRoute);
app.use("/customer/ai", chatsRoute)
app.use("/user",fetchUser);
