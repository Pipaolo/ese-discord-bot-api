import app from "../src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

export const initSockets = () => {
  const httpServer = createServer(app.callback());
  const io = new Server(httpServer, {
    path: "/chat-box",
    allowEIO3: true,
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("join room", ({ user, roomID }) => {
      socket.join(`room-${roomID}`);
      console.log(`User: ${user.username}`);
      console.log(`room-${roomID}`);
      // Send new data to the room
      socket.emit("send data", {
        username: user.username,
      });
    });

    socket.on("chat message", ({ roomID, message }) => {
      io.to(`room-${roomID}`).emit("chat message", {
        roomID,
        data: {
          ...message,
          timestamp: new Date().toISOString(),
        },
      });
    });
  });

  httpServer.listen(4040, () =>
    console.log("Server is running on port: " + 4040)
  );
};
