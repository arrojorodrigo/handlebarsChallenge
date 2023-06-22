import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewRouter from "./routes/views.router.js"
import { Server } from 'socket.io' //server propio del websocket

const app =express();
const httpserver =app.listen(8080,()=>console.log("Server arriba"))

const socketServer =new Server(httpserver)

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'))
app.use('/',viewRouter)

const logs = []
socketServer.on('connection',socket =>{
    console.log("Inicio la comunicación")

        socket.on("message",data=>{
        logs.push({socketid:socket.id,message:data})
        socketServer.emit('log',{logs});
    })
})