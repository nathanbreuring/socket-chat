import Koa from "koa";
import Http from "http";
import Socketio from "socket.io";

const app = new Koa();
const server = Http.createServer(app.callback());
const io = Socketio(server);
const connectedClients = [];

const addClient = (id, userName) => {
  connectedClients.push({ id, userName });
};

const removeClient = id => {
  const i = connectedClients.findIndex(c => c.id === id);
  connectedClients.splice(i, i + 1);
};

io.on("connection", function(client) {
  client.on("message", function(payload) {
    io.emit("message", payload);
  });

  client.on("privateMessage", function(payload) {
    const user1 = payload.userPair.user1;
    const user2 = payload.userPair.user2;

    // Emit the message only to the 2 involved recipients
    io.to(user1.id)
      .to(user2.id)
      .emit("privateMessage", {
        userPair: { user1, user2 },
        user: payload.user,
        userMsg: payload.userMsg
      });
  });

  client.on("disconnect", function() {
    const user = connectedClients.find(c => c.id === client.id);
    if (!!user && !!user.userName) {
      io.emit("leave", user.userName);
      removeClient(client.id);
      io.emit("updateUsers", connectedClients);
    }
  });

  client.on("enter", function(userName) {
    // User enters server, here its name is mapped to an id
    addClient(client.id, userName);
    // The user object is send back to the client
    io.to(client.id).emit("updateUser", { id: client.id, userName });
    // Update the logged-in userlist in the client
    io.emit("updateUsers", connectedClients);
    // And emit a message about user entering
    io.emit("enter", userName);
  });

  client.on("error", function(err) {
    console.log(`Client with id ${client.id} threw error ${err}`);
    io.emit("error", err);
  });
});

server.listen(3100);

console.log("Server running on port 3100");
