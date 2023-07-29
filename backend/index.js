const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const routes = require('./routes')
const connectionDB = require("./config/connectionDB")
const socket = require("socket.io");

dotenv.config()
app.use(cors())
app.use(express.json())
connectionDB()
app.use("/", routes)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true,
        allowedHeaders: ["access-token"],
    },
    allowEIO3: true
});

io.on("connection", (socket) => {

    socket.join("add-user", (userId) => {
        socket.emit(userId, socket.id)
    });

    // frontend user side 
    socket.on("message", (data) => {
        io.to("add-user").emit('reciveToInstructor', data.message);
    })

    // frontend instructor side 
    socket.on("SendToUser", (data) => {
        io.to("add-user").emit('reciveToUser', data.message);
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })

    socket.on('disconnect', () => {
    });

    // videocall
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
});