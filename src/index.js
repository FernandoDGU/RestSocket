const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const server = require("http").Server(app);
const socketIO = require("socket.io")(server, {cors: {origin: "*",},});


var bp = require('body-parser');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


// Rutas
const socketRouter = require("./routes/socketRouter")(socketIO).router;
app.use("/app", socketRouter);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("socketio", socketIO);

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/app/send", (req, res) => {
    socketIO.emit("mod_forecast", 1234);
    res.json("ok");
});

socketIO.on("connection", (socket) =>{
    console.log(socket.id);
});

server.listen(port, () => {
    console.log(`Server on port: ` + port);
});
