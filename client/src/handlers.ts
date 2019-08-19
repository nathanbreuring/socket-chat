import Socketio from "socket.io-client";

export const socketHandlers = updateChatHistory => {
  const socket = Socketio.connect("http://localhost:3100");

  // incoming events
  socket.on("error", function(err: any) {
    console.log("Error:", err);
  });

  socket.on("message", function(payload) {
    updateChatHistory(payload);
  });

  socket.on("leave", function(userName) {
    updateChatHistory({ userName, message: "has left chat" });
  });

  // outgoing events
  const message = (userName, message) => {
    socket.emit("message", { userName, message });
  };

  return {
    message
  };
};
