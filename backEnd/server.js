"use strict";

import express from "express";
import { Server } from "socket.io";

const app = express();
const port = 3000;

app.get("/", (req, res) => res.status(200).json({ message: "Hello World!" }));

app.post("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

const io = new Server(server, { cors: "*" });

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
  });

  socket.on("sendData", (data) => {
    io.emit("message", data);
  });

  socket.on("showTyping", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("removeTyping", (data) => {
    io.emit("remove", data);
  });
});
