import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { sentence } from "txtgen";

const port = process.env.PORT || 8080;
const app = express();
app.use(cors({
  origin: "*"
}));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

export type Channel = {
  id: String;
  name: String;
};

export type User = {
  id: string;
  name: string;
  avatar?: string;
  connected: boolean;
};

export type Message = {
  id: string;
  date: Number;
  content: String;
  channel: Channel;
  creator: User;
  type: "created" | "deleted" | "updated";
};

const channels: Channel[] = [
  {
    id: "1",
    name: "General",
  },
  {
    id: "2",
    name: "Private channel",
  },
];

const users: User[] = [
  {
    id: "u001",
    name: "Loris H.",
    connected: true,
  },
  {
    id: "u002",
    name: "Mila H.",
    connected: true,
  },
  {
    id: "u003",
    name: "Christophe H.",
    connected: true,
  },
];

setInterval(() => {
  const user = users[Math.floor(Math.random() * users.length)];

  user.connected = !user.connected;

  console.log("Status update", user);
  io.to("status").emit("status-update", user);
}, 1000);

io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});

const messages: Message[] = [];

let i = 0;

app.get("/", (_, res) => res.send("--- SocketIO Server 🍺 ---"));

app.get("/channels", (req, res) => {
  res.status(200).json(channels);
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/channels/:id/messages", (req, res) => {
  res.status(200).json(
    messages
      .filter(message => message.type === "created")
      .filter(message => message.channel.id === req.params.id)
  );
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.join("status");

  const interval = setInterval(() => {
    const message: Message = {
      id: String(i++),
      date: Date.now(),
      content: sentence(),
      creator: users[Math.floor(Math.random() * users.length)],
      channel: channels[Math.floor(Math.random() * channels.length)],
      type: "created",
    };
    //console.log('Pushing new message', message);
    socket.emit('message', message);
    messages.push(message);
  }, 1000);

  const updateInterval = setInterval(() => {
    const message = messages[Math.floor(Math.random() * messages.length)];

    message.content = `${message.content} (edited)`;
    message.type = "updated";
    //console.log('Pushing updated message', message);

    socket.emit('message', message);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Disconnected");
    socket.leave("status");
    clearInterval(interval);
    clearInterval(updateInterval);
  });
});

server.listen(port, () => {
  console.log(`Server on *:${port}`);
});