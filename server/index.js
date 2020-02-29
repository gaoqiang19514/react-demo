var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 4000;

io.on("connection", function(socket) {
  io.emit("chat message", 'Hello client!');
  socket.on("chat message", function(msg) {
    io.emit("chat message", `From to server: ${msg}`);
  });
  setInterval(() => {
	io.emit("chat message", `From to server: ${new Date().getTime()}`);
  }, 2000)
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
