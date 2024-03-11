"use strict";

const send = document.getElementById("send");
const data = document.getElementById("inputData");

const socket = io("http://localhost:3000");

function getInputData() {
  socket.emit("sendData", data.value);
  data.value = "";
}

socket.on("message", (data) => {
  let cartona = `<button class="btn btn-danger m-2">${data}</button>`;
  document.getElementById("showMessage").innerHTML += cartona;
});

send.addEventListener("click", getInputData);

data.addEventListener("input", (e) => {
  socket.emit("showTyping", e.target.value);
});
socket.on("typing", (data) => {
  document.getElementById("isTyping").classList.replace("d-none", "d-block");
});

data.addEventListener("keyup", (e) => {
  socket.emit("removeTyping", e.target.value);
});
socket.on("remove", (data) => {
  setTimeout(() => {
    document.getElementById("isTyping").classList.replace("d-block", "d-none");
  }, 1500);
});
