import Koa from "koa";
import Http from "http";
import Socketio from "socket.io";

const app = new Koa();
const server = Http.createServer(app.callback());
const io = Socketio(server);

io.on("connection", function(client) {
  client.on("message", function(payload) {
    io.emit("message", payload);
  });

  client.on("disconnect", function() {
    console.log("client disconnect...", client.id);
  });

  client.on("error", function(err) {
    console.log(`Client with id ${client.id} threw error ${err}`);
    io.emit("error", err);
  });
});

server.listen(3100);

console.log("Server running on port 3100");
