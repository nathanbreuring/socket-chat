import Socketio from "socket.io-client";
import { IUpdateChat } from "./interfaces";

export const handler = (updateChat: IUpdateChat) => {
  const socket = Socketio.connect("http://localhost:3100");

  // listeners - incoming events
  socket.on("error", function(err: any) {
    console.log("Error:", err);
  });

  socket.on("message", function(payload) {
    updateChat.updateHistory(payload);
  });

  socket.on("privateMessage", function(payload) {
    updateChat.updatePrivateHistory(payload);
  });

  socket.on("leave", function(userName) {
    updateChat.updateHistory({ userName, message: "has left chat" });
  });

  socket.on("enter", function(userName) {
    updateChat.updateHistory({ userName, message: "has entered chat" });
  });

  socket.on("updateUser", function(user) {
    updateChat.updateUser(user);
  });

  socket.on("updateUsers", function(connectedClients) {
    updateChat.updateUsers(connectedClients);
  });

  // outgoing events
  const message = (userName, message) => {
    socket.emit("message", { userName, message });
  };

  const privateMessage = payload => {
    socket.emit("privateMessage", payload);
  };

  const leave = userName => {
    socket.emit("leave", userName);
  };

  const enter = userName => {
    socket.emit("enter", userName);
  };

  return {
    message,
    privateMessage,
    enter,
    leave
  };
};
