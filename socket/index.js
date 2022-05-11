const io = require("socket.io")(8900, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://class.chartr.in",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  // console.log(userId, socketId, "{{{}}}")
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  // console.log(userId, users);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text, type, pausedTime }) => {
    console.log(type, "{{}}")
    // console.log(receiverId)
    const user = getUser(receiverId);
    // console.log(user);
    // console.log(text)
    // console.log(user)
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
      type,
      pausedTime
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
